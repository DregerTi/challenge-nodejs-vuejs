/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    colors: {
      'black': '#3F3F3F',
      'white': '#FCFCFC',
      'lightgrey': '#E0E0E0',
      'grey': '#616161',
      'primary': '#DEEFF2',
      'secondary': '#379AAB',
      'success': '#97CE5F',
      'error': '#DD7F7F',
      'warning': '#d79650',
      'background': '#EEEEEE'
    },

    extend: {},
  },
  plugins: [],
}
