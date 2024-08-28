/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/routes/**/*.{ejs,md}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['cupcake'],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
