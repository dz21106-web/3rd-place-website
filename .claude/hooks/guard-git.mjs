/**
 * Claude Code がコマンドを実行する直前に呼ばれるチェック（PreToolUse フック）。
 *
 * なぜ必要か:
 *   .claude/settings.json の deny リストは「よくある書き方」しか止められない
 *   （例: `git push origin main` は止まるが `git push origin HEAD:main` は通る）。
 *   ここではコマンドを分解し、実際に今いるブランチも見て判断するので、
 *   書き方を変えても止まる。
 *
 * 止めるもの:
 *   - main ブランチ上での commit / push / merge / rebase など
 *   - どのブランチからでも main への push
 *   - 強制 push（--force / -f / +refspec）、リモートブランチの削除
 *   - 作業が消えて戻せない操作（reset --hard, clean -f, checkout -- ., restore ., stash drop/clear, branch -D）
 *   - gh pr merge（マージは人間が GitHub の画面で行う）
 *   - rm -rf 系（-fr, -r -f なども含む）
 *
 * 止めたときは exit code 2 で終了し、理由を stderr に出す（Claude Code の仕様）。
 * Mac と Windows の両方で動くよう、Node.js だけで書いている。
 */
import { execFileSync } from 'node:child_process'

const PROTECTED_BRANCHES = new Set(['main', 'master'])

function readStdin() {
  return new Promise((resolve) => {
    let data = ''
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', (chunk) => (data += chunk))
    process.stdin.on('end', () => resolve(data))
  })
}

function block(reason) {
  process.stderr.write(
    `[guard-git] ブロックしました: ${reason}\n` +
      'このリポジトリの CLAUDE.md「作業ルール」に反する操作です。必要な場合は作業者に理由を説明して、人間が手で実行してください。\n'
  )
  process.exit(2)
}

function currentBranch(cwd) {
  try {
    return execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
  } catch {
    return ''
  }
}

// 「;」「&&」「||」「|」「&」や改行でコマンドを分け、それぞれを単語に分ける
function splitSegments(command) {
  return command
    .split(/&&|\|\||[;|&\n]/)
    .map((segment) =>
      segment
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((token) => token.replace(/^['"]|['"]$/g, ''))
    )
    .filter((tokens) => tokens.length > 0)
}

// `git -C dir -c k=v push ...` のような書き方から、サブコマンド（push 等）と残りの引数を取り出す
function parseGit(tokens) {
  const gitIndex = tokens.findIndex((t) => t === 'git' || /[\\/]git(\.exe)?$/.test(t))
  if (gitIndex === -1) return null
  let i = gitIndex + 1
  while (i < tokens.length && tokens[i].startsWith('-')) {
    if (['-C', '-c', '--git-dir', '--work-tree', '--namespace'].includes(tokens[i])) i += 2
    else i += 1
  }
  if (i >= tokens.length) return null
  return { sub: tokens[i], args: tokens.slice(i + 1) }
}

function pushTargetsMain(args) {
  const positional = args.filter((a) => !a.startsWith('-'))
  // positional[0] はリモート名（origin）、それ以降が送り先の指定（refspec）
  return positional.slice(1).some((ref) => {
    const dest = ref.includes(':') ? ref.split(':').pop() : ref
    const name = dest.replace(/^\+/, '').replace(/^refs\/heads\//, '')
    return PROTECTED_BRANCHES.has(name)
  })
}

function checkGit({ sub, args }, branch) {
  const onProtected = PROTECTED_BRANCHES.has(branch)
  const has = (...flags) => args.some((a) => flags.includes(a))

  if (onProtected && ['commit', 'push', 'merge', 'rebase', 'cherry-pick', 'revert', 'am'].includes(sub)) {
    block(`${branch} ブランチ上で git ${sub} しようとしました。先に作業用ブランチを作ってください（git switch -c <種類>/<内容> origin/main）。`)
  }

  if (sub === 'push') {
    if (pushTargetsMain(args)) block('main への直接 push です。PR を作って承認をもらってください。')
    if (has('--force', '-f', '--force-with-lease', '--force-if-includes') || args.some((a) => /^--force-with-lease=/.test(a)))
      block('強制 push（--force）です。他の人の作業や履歴が消える可能性があります。')
    if (args.some((a) => /^\+/.test(a))) block('強制 push（+refspec）です。')
    if (has('--delete', '-d') || args.some((a) => /^:/.test(a))) block('リモートブランチの削除です。')
    if (has('--mirror', '--all')) block('全ブランチの push です。')
  }

  if (sub === 'reset' && has('--hard', '--merge', '--keep')) block(`git reset ${args.join(' ')} は作業中の変更を消します。`)
  if (sub === 'clean' && args.some((a) => /^-[a-zA-Z]*f/.test(a) || a === '--force')) block('git clean は記録していないファイルを消します。')
  if (sub === 'checkout' && (has('.', '--', '-f', '--force'))) block('git checkout で作業中の変更を捨てる操作です。')
  if (sub === 'restore' && !has('--staged', '-S') && args.some((a) => !a.startsWith('-'))) block('git restore で作業中の変更を捨てる操作です。')
  if (sub === 'stash' && ['drop', 'clear'].includes(args[0])) block(`git stash ${args[0]} は退避した変更を消します。`)
  if (sub === 'branch' && (has('-D') || (has('-d', '--delete') && has('-f', '--force')))) {
    block('ブランチの強制削除（branch -D）です。')
  }
  if (sub === 'switch' && has('--discard-changes', '-f', '--force')) block('git switch で作業中の変更を捨てる操作です。')
}

function checkOther(tokens) {
  const [cmd, ...args] = tokens
  const base = cmd.split(/[\\/]/).pop()

  if (base === 'gh' && args[0] === 'pr' && args[1] === 'merge') {
    block('gh pr merge です。マージは承認後に人間が GitHub の画面で行います。')
  }
  if (base === 'gh' && args[0] === 'repo' && ['delete', 'edit', 'rename', 'archive'].includes(args[1])) {
    block(`gh repo ${args[1]} はリポジトリの設定を変えます。`)
  }
  if (base === 'gh' && args[0] === 'api' && args.some((a) => /^(-X|--method)$/.test(a))) {
    const method = args[args.findIndex((a) => /^(-X|--method)$/.test(a)) + 1] || ''
    if (/^(PUT|PATCH|DELETE)$/i.test(method)) block('gh api で GitHub の設定を書き換える操作です。')
  }
  if (base === 'rm' || base === 'rm.exe') {
    const flags = args.filter((a) => a.startsWith('-')).join('')
    const recursive = /r|R|--recursive/.test(flags)
    const force = /f|--force/.test(flags)
    if (recursive && force) block('rm -rf 系のまとめて削除です。消したいものを作業者に確認してください。')
  }
  if (base === 'vercel' && args.some((a) => a === '--prod' || a === '--production')) {
    block('Vercel への本番デプロイです。本番は main へのマージで自動デプロイされます。')
  }
}

// ヒアドキュメント（<<EOF … EOF）の本文を取り除く。コミットメッセージや PR 本文の中の文字を、命令と誤判定しないため
function stripHeredocs(command) {
  return command.replace(/<<-?\s*(['"]?)(\w+)\1[^\n]*\n[\s\S]*?\n\s*\2\s*(?=\n|$)/g, '')
}

// `bash -c "..."` の中身を取り出す（中身も同じルールでチェックするため）
function extractShellC(command) {
  const inner = []
  const re = /(?:^|[\s;&|(])(?:\S*[\\/])?(?:ba|z)?sh(?:\.exe)?\s+-c\s+(?:"((?:[^"\\]|\\.)*)"|'([^']*)')/g
  let m
  while ((m = re.exec(command))) inner.push(m[1] ?? m[2])
  return inner
}

// 引用符で囲まれた部分（-m "..." のメッセージなど）を中身のない "Q" に置き換える
function maskQuoted(command) {
  return command.replace(/"(?:[^"\\]|\\.)*"|'[^']*'/g, 'Q')
}

function checkCommand(command, branch, depth = 0) {
  const body = stripHeredocs(command)
  if (depth < 3) for (const inner of extractShellC(body)) checkCommand(inner, branch, depth + 1)

  for (const tokens of splitSegments(maskQuoted(body))) {
    // `sudo` や `env X=1` などの前置きを外す
    while (tokens.length && (['sudo', 'env', 'command', 'time', 'nohup'].includes(tokens[0]) || /^\w+=/.test(tokens[0]))) {
      tokens.shift()
    }
    if (!tokens.length) continue
    const git = parseGit(tokens)
    if (git) checkGit(git, branch)
    else checkOther(tokens)
  }
}

const input = JSON.parse((await readStdin()) || '{}')
if (input.tool_name !== 'Bash') process.exit(0)

checkCommand(input.tool_input?.command ?? '', currentBranch(input.cwd || process.cwd()))
process.exit(0)
