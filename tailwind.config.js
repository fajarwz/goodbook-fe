/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Quicksand', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        black: {
          default: '#404040',
        },
        gray: {
          default: '#BCBCBC',
          dark: '#7A7A7A',
        },
        customWhite: {
          warm: '#7A7A7A',
          dark: '#ECECEC',
        },
        orange: {
          default: '#FC6E20',
          defaultDark: '#E0631E',
          light: '#FF8A00',
        },
      },
    },
    container: {
      padding: '2rem',
      center: true,
      screens: {
          sm: '540px',
          md: '720px',
          lg: '960px',
          xl: '1140px',
          '2xl': '1320px',
      },
    },
  },
  plugins: [],
}

