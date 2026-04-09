import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:    '#0B1F3A',
        'navy-light': '#1A3257',
        orange:  '#D4874A',
        'orange-dark': '#C07840',
        cream:   '#F5F2EC',
        'cream-dark': '#EDE9DF',
        ink:     '#1C1C1E',
      },
      fontFamily: {
        sans:    ['Noto Sans JP', 'Inter', 'sans-serif'],
        heading: ['Noto Serif JP', 'Inter', 'serif'],
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
    },
  },
  plugins: [],
}

export default config
