/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: '2rem',
    center: true,
    extend: {
      fontFamily:{
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

