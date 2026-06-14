/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
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
        brand: {
          bgLight: '#fcfbfa', // warm paper
          bgDark: '#171513', // warm charcoal
          cardLight: '#ffffff',
          cardDark: '#211e1b',
          borderLight: '#e7e3df',
          borderDark: '#36312c',
          textLight: '#1c1917',
          textDark: '#f5f5f4',
          engineer: 'var(--brand-engineer)',
          analyst: 'var(--brand-analyst)',
          designer: 'var(--brand-designer)',
        }
      },
      fontFamily: {
        'pop': ['Poppins', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        serif: ['Cormorant Garamond', 'serif'],
        playfair: ['Playfair Display', 'serif'],
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
      },
      animation: {
        'blink': 'blink 0.8s step-end infinite',
      },
      keyframes: {
        blink: {
          '50%': { opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}

