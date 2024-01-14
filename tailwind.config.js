/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'primary-green': '#536E47',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

