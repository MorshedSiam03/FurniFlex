/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Barlow: 'Barlow, sans-serif', // Make sure this includes sans-serif as a fallback
      }
    },
  },
  plugins: [require('daisyui'),],
}

