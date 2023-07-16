/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    './public/**/*.html',
   './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/vue-tailwind-datepicker/**/*.js'
  ],
  theme: {
    extend: {
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
          'background': '#EEEEEE',
          "vtd-primary": colors.neutral,
          "vtd-secondary": colors.white,
        }
    },
  },

}
