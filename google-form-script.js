// Google Apps Script: 3rd Place 仕事・住居データベース協力フォーム 一括作成
// 使い方:
// 1. https://script.google.com/home にアクセス
// 2. 「新しいプロジェクト」を作成
// 3. このコードを全て貼り付け
// 4. ▶ 実行ボタンを押す（関数: createForm）
// 5. 初回は権限の承認が必要です

function createForm() {
  // ===== 新しいフォームを作成 =====
  var form = FormApp.create('3rd Place 仕事・住居データベース協力フォーム');

  // フォームの説明
  form.setDescription(
    '〜 あなたの経験が、次に来る仲間の武器になる 〜\n\n' +
    'このフォームは、メルボルンで先に経験を積んだ仲間の「生の声」を、\n' +
    'これから渡航する仲間へバトンパスするためのデータ集めです。\n\n' +
    '📌所要時間：5〜15分（任意項目を埋めるかによります）\n' +
    '📌回答は3rd Place 運営内で管理し、コミュニティのナレッジとして活用します\n' +
    '📌個人や店舗への誹謗中傷は含めないでください\n' +
    '📌途中保存したい場合はGoogleアカウントにログインしてください\n\n' +
    'ご協力ありがとうございます！'
  );

  form.setIsQuiz(false);
  form.setAllowResponseEdits(true);
  form.setCollectEmail(false);
  form.setConfirmationMessage('ご協力ありがとうございます！\nあなたの経験が、次にメルボルンに来る仲間の大きな助けになります 🙏\n\n内容に追加・修正がある場合は、いつでも再送信してください。');

  // ==========================================
  // Section 1: 基本情報（最初のセクション）
  // ==========================================

  // Q1: お名前（ニックネーム可）
  var q1 = form.addTextItem();
  q1.setTitle('お名前（ニックネーム可）');
  q1.setRequired(true);

  // Q2: LINEの表示名
  var q2 = form.addTextItem();
  q2.setTitle('LINEの表示名');
  q2.setHelpText('運営が回答者を確認するために使います');
  q2.setRequired(true);

  // Q3: メンバー歴
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('メンバー歴');
  q3.setChoiceValues(['3ヶ月未満', '3ヶ月〜1年', '1年以上']);
  q3.setRequired(true);

  // Q4: 共有したい情報の種類（分岐用）
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('共有したい情報の種類');
  q4.setRequired(true);

  // ==========================================
  // Section 2: 💼 仕事情報
  // ==========================================
  var section2 = form.addPageBreakItem();
  section2.setTitle('💼 仕事情報');
  section2.setHelpText('あなたが働いた（働いている）職場について教えてください。\n店名や詳細は3rd Placeメンバー限定で共有されます。');

  // Q5: 職場名
  var q5 = form.addTextItem();
  q5.setTitle('職場名');
  q5.setRequired(true);

  // Q6: 業種
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('業種');
  q6.setChoiceValues(['カフェ', 'ジャパレス', 'ローカルレストラン', 'クリーニング', 'マッサージ', 'ファーム', 'その他']);
  q6.setRequired(true);

  // Q7: エリア
  var q7 = form.addTextItem();
  q7.setTitle('エリア（例：CBD, South Yarra, Carlton）');
  q7.setRequired(true);

  // Q8: 時給（AUD）
  var q8 = form.addTextItem();
  q8.setTitle('時給（AUD）');
  q8.setHelpText('例：25.50');

  // Q9: シフト時間帯
  var q9 = form.addCheckboxItem();
  q9.setTitle('シフト時間帯');
  q9.setChoiceValues(['朝', '昼', '夜', '深夜']);

  // Q10: シフト頻度
  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('シフト頻度');
  q10.setChoiceValues(['週1-2', '週3-4', '週5以上', 'シフト自由']);

  // Q11: 必要な英語力
  var q11 = form.addMultipleChoiceItem();
  q11.setTitle('必要な英語力');
  q11.setChoiceValues(['不要', '簡単な会話', '日常会話以上']);

  // Q12: まかない
  var q12 = form.addMultipleChoiceItem();
  q12.setTitle('まかない');
  q12.setChoiceValues(['あり', 'なし', 'たまにあり']);

  // Q13: 週末休み
  var q13 = form.addMultipleChoiceItem();
  q13.setTitle('週末休み');
  q13.setChoiceValues(['はい', 'いいえ', 'シフトによる']);

  // Q14: オーナー・マネージャーの人柄
  var q14 = form.addParagraphTextItem();
  q14.setTitle('オーナー・マネージャーの人柄');
  q14.setHelpText('どんな人か、働きやすさなど自由に書いてください');

  // Q15: 初週のアドバイス
  var q15 = form.addParagraphTextItem();
  q15.setTitle('初週のアドバイス');
  q15.setHelpText('最初の1週間で知っておくと助かることを教えてください');

  // Q16: この職場の注意点・デメリット
  var q16 = form.addParagraphTextItem();
  q16.setTitle('この職場の注意点・デメリット');
  q16.setHelpText('正直に書いてもらえると、次の人の判断材料になります');

  // ==========================================
  // Section 3: 🏠 住居情報
  // ==========================================
  var section3 = form.addPageBreakItem();
  section3.setTitle('🏠 住居情報');
  section3.setHelpText('あなたが住んだ（住んでいる）物件について教えてください。\n住所の公開範囲は自分で選べます。');

  // Q17: 物件タイプ
  var q17 = form.addMultipleChoiceItem();
  q17.setTitle('物件タイプ');
  q17.setChoiceValues(['シェアハウス', 'ホームステイ', 'スチューデントアパート', 'バックパッカーズ', 'その他']);
  q17.setRequired(true);

  // Q18: エリア
  var q18 = form.addTextItem();
  q18.setTitle('エリア（例：CBD, South Yarra, Carlton）');

  // Q19: 住所の公開範囲
  var q19 = form.addMultipleChoiceItem();
  q19.setTitle('住所の公開範囲');
  q19.setChoiceValues(['エリアのみ', '大通り名まで', '建物名まで']);
  q19.setRequired(true);

  // Q20: 住所
  var q20 = form.addTextItem();
  q20.setTitle('住所');
  q20.setHelpText('公開範囲に応じて運営が調整します。部屋番号は公開しません。');

  // Q21: 家賃（週AUD）
  var q21 = form.addTextItem();
  q21.setTitle('家賃（週AUD）');
  q21.setHelpText('例：250');
  q21.setRequired(true);

  // Q22: 光熱費込み？
  var q22 = form.addMultipleChoiceItem();
  q22.setTitle('光熱費込み？');
  q22.setChoiceValues(['はい', 'いいえ', '一部込み']);

  // Q23: Wi-Fi込み？
  var q23 = form.addMultipleChoiceItem();
  q23.setTitle('Wi-Fi込み？');
  q23.setChoiceValues(['はい', 'いいえ']);

  // Q24: 家具付き？
  var q24 = form.addMultipleChoiceItem();
  q24.setTitle('家具付き？');
  q24.setChoiceValues(['はい', 'いいえ', '一部あり']);

  // Q25: 日本人ハウスメイトいる？
  var q25 = form.addMultipleChoiceItem();
  q25.setTitle('日本人ハウスメイトいる？');
  q25.setChoiceValues(['はい', 'いいえ', '不明']);

  // Q26: 最低滞在期間
  var q26 = form.addMultipleChoiceItem();
  q26.setTitle('最低滞在期間');
  q26.setChoiceValues(['なし', '1ヶ月', '3ヶ月', '6ヶ月', '1年']);

  // Q27: オーナー・ハウスメイトの雰囲気
  var q27 = form.addParagraphTextItem();
  q27.setTitle('オーナー・ハウスメイトの雰囲気');
  q27.setHelpText('どんな人たちか、住みやすさなど自由に書いてください');

  // Q28: 初週のアドバイス
  var q28 = form.addParagraphTextItem();
  q28.setTitle('初週のアドバイス');
  q28.setHelpText('最初の1週間で知っておくと助かることを教えてください');

  // Q29: この物件の注意点・デメリット
  var q29 = form.addParagraphTextItem();
  q29.setTitle('この物件の注意点・デメリット');
  q29.setHelpText('正直に書いてもらえると、次の人の判断材料になります');

  // ==========================================
  // Section 4: ✅ 同意事項
  // ==========================================
  var section4 = form.addPageBreakItem();
  section4.setTitle('✅ 同意事項');

  // Q30: 同意チェック
  var q30 = form.addCheckboxItem();
  q30.setTitle('以下に同意の上、送信してください');
  q30.setChoiceValues([
    '投稿内容は3rd Place内で共有されます',
    '個人を特定できる情報は含めないようにします',
    '情報は定期的に更新が必要な場合があります'
  ]);
  q30.setRequired(true);

  // ==========================================
  // Section 5: 🙏 運営からの追加依頼
  // ==========================================
  var section5 = form.addPageBreakItem();
  section5.setTitle('🙏 運営からの追加依頼');
  section5.setHelpText('任意ですが、答えていただけると運営の参考になります！');

  // Q31: フォローアップ連絡OK？
  var q31 = form.addMultipleChoiceItem();
  q31.setTitle('フォローアップ連絡OK？');
  q31.setHelpText('内容の確認や追加質問のために運営から連絡してもいいですか？');
  q31.setChoiceValues(['はい、いつでもOK', '内容による', 'いいえ']);

  // Q32: 他にシェアしたい情報
  var q32 = form.addParagraphTextItem();
  q32.setTitle('他にシェアしたい情報');
  q32.setHelpText('上の質問でカバーできなかったことがあれば自由に書いてください');

  // Q33: 3rd Placeへのフィードバック
  var q33 = form.addParagraphTextItem();
  q33.setTitle('3rd Placeへのフィードバック');
  q33.setHelpText('サービスへの感想・要望など何でもどうぞ');

  // ==========================================
  // 分岐ロジック設定
  // ==========================================
  // Q4の選択肢に応じてセクションを分岐
  var choice_job = q4.createChoice('💼 仕事情報のみ', section2);
  var choice_housing = q4.createChoice('🏠 住居情報のみ', section3);
  var choice_both = q4.createChoice('両方', section2);
  var choice_other = q4.createChoice('その他', section4);
  q4.setChoices([choice_job, choice_housing, choice_both, choice_other]);

  // Section 2（仕事）の後 → Section 4（同意）に飛ぶ
  // ※「両方」の場合はSection 3に行くべきだが、Google Formsの制約上
  //   セクション単位の分岐しかできないため、仕事→同意→完了とする
  //   （「両方」の人はフォームを2回送信してもらう運用も検討）
  section3.setGoToPage(section4); // 住居の後は同意へ

  // ログ出力
  Logger.log('フォーム作成完了！');
  Logger.log('編集URL: ' + form.getEditUrl());
  Logger.log('回答URL: ' + form.getPublishedUrl());
}
