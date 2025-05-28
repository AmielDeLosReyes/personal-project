/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 1s ease-in forwards',
      },
      keyframes: {
        'fade-in': {
          'to': {
            opacity: '1',
          },
        }
      },
    },
  },
  plugins: [],
}