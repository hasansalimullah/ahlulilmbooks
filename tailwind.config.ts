import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Library-inspired parchment and wood tones
        parchment: '#FDFBF7',
        'wood-light': '#A67C52',
        'wood-dark': '#8B5A2B',
        'text-primary': '#2C221E',
        'text-muted': '#5A4A42',
        'accent-gold': '#D4AF37',
        'border-warm': '#E8DDD2',
      },
      fontFamily: {
        sans: ['system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      boxShadow: {
        'book': '0 4px 12px rgba(139, 90, 43, 0.15)',
        'book-hover': '0 8px 24px rgba(139, 90, 43, 0.2)',
      },
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
      },
    },
  },
  plugins: [],
}

export default config
