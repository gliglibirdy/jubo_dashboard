/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  important: '#root',
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        jubo: {
          primary: '#0097A7',
          'primary-dark': '#005F64',
          'primary-light': '#C5F0F7',
          secondary: '#546E7A',
          'secondary-dark': '#37474F',
          'secondary-50': '#ECEFF1',
          page: '#EAF3F5',
          paper: '#FFFFFF',
          error: '#D32F2F',
          success: '#2E7D32',
          info: '#0288D1',
        },
      },
      fontFamily: {
        sans: [
          '"Noto Sans TC"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"PingFang TC"',
          '"Microsoft JhengHei"',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
