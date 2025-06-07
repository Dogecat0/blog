/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./themes/my_theme/layout/**/*.ejs'],
  theme: {
    colors: {
      'primary': '#121212',
      'secondary': '#faf3e0',
      'tertiary': '#142C27',
      'accent': '#C16D24',
      'accent-light': '#C16D24',
    },
    extend: {
      fontFamily: {
        'pop': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

