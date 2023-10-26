/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./themes/my_theme/layout/**/*.ejs'],
  theme: {
    colors: {
      'primary': '#121212',
      'secondary': '#faf3e0',
      'tertiary': '#102620',
      'accent': '#cc3700',
      'accent-light': '#CD8A50',
    },
    extend: {
      fontFamily: {
        'pop': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

