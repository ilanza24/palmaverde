/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'title': ['"Italianno", cursive'],
      'body': ['"Poppins"'],
    },
    colors: {
      'background-green': '#536E47',
      'font': '#373737',
      'font-light': '#FEFDFC',
      'font-middle': '#626262',
      'primary': '#536E47',
      'secondary': '#E86C4F',
    },
    extend: {
      spacing: {
        '20': '1.25rem',
        '24': '1.5rem',
        '28': '1.75rem',
        '32': '2rem',
        '36': '2.25rem',
        '40': '2.5rem',
        '44': '2.75rem',
        '48': '3rem',
        '52': '3.25rem',
        '56': '3.5rem',
        '60': '3.75rem',
        '64': '4rem',
        '68': '4.25rem',
        '72': '4.5rem',
        '76': '4.75rem',
        '80': '5rem',
        '84': '5.25rem',
        '88': '5.5rem',
      }
    },
  },
  plugins: [],
}

