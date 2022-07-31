/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'chocolate': '#1a1a1a',
        'blueprimary': '#646cff',
        'bluesecondary': '#535bf2'

      }
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
