/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFE45E',
        'secondary': '#AAA1C8',
        'tertiary': '#84BC9C',
        'quaternary': '#1C7293',
      },
    },
  },
  plugins: [],
}