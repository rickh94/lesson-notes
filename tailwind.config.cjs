/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'carribean-current': '#005e66',
        'hoookers-green': '#59736ca',
        'pale-dogwood': '#ccb0a4',
        'tan': '#ddb892',
        'sage': '#c2c5aa',
        'cornsilk': '#fefae0',
        'cool-gray': '#8e8dc5',
        'ivory': '#fffded',
        'ash-gray': '#abbdc2',
        'air-superiority-blue': '#75a1c0',
        'wine': '#602b35',
      }
    },
  },
  plugins: [],
}
