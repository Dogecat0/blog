/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./themes/**/*.ejs",
    "./themes/**/*.js",
    "./themes/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'tertiary': 'var(--color-tertiary)',
        'accent': 'var(--color-accent)',
        'accent-light': 'var(--color-accent-light)',
        'muted': 'var(--color-muted)',
        'highlight': 'var(--color-highlight)',
        'creative': 'var(--color-creative)',
        'sage': 'var(--color-sage)',
      },
      fontFamily: {
        'pop': ['Poppins', 'sans-serif'],
      },
      textColor: {
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'accent': 'var(--color-accent)',
        'accent-light': 'var(--color-accent-light)',
        'tertiary': 'var(--color-tertiary)',
        'muted': 'var(--color-muted)',
        'highlight': 'var(--color-highlight)',
        'creative': 'var(--color-creative)',
        'sage': 'var(--color-sage)',
      },
      backgroundColor: {
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'accent': 'var(--color-accent)',
        'accent-light': 'var(--color-accent-light)',
        'tertiary': 'var(--color-tertiary)',
        'highlight': 'var(--color-highlight)',
        'creative': 'var(--color-creative)',
        'sage': 'var(--color-sage)',
      },
      boxShadow: {
        'soft': '0 2px 15px 0 rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 20px 0 rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}

