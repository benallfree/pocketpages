/** @type {import('tailwindcss').Config} */
export default {
  content: ['./pb_hooks/pages/**/*.{ejs,md}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'blockquote p:first-of-type::before': false,
            'blockquote p:first-of-type::after': false,
          },
        },
      },
    },
  },
  daisyui: {
    themes: ['cupcake'],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
