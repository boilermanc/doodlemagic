/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
    "!./node_modules/**",
  ],
  theme: {
    extend: {
      colors: {
        'gunmetal': '#393d3f',
        'off-white': '#fdfdff',
        'silver': '#c6c5b9',
        'pacific-cyan': '#62929e',
        'blue-slate': '#546a7b',
        'soft-gold': '#d4a574',
      }
    }
  },
  plugins: [],
}
