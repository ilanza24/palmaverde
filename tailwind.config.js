/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'title': ['"Righteous"'],
      'body': ['"Poppins"'],
    },
    colors: {
      'background': '#F7F3EF',
      'font': '#373737',
      'font-light': '#FEFDFC',
      'font-middle': '#626262',
      'primary': '#2C6246',
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
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

