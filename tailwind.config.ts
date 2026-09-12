import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Classical espresso/scholarly theme
        parchment: '#FFFFFF',
        'section-bg': '#F9F8F6',
        'wood-light': '#54413A',
        'wood-dark': '#3B2B26',
        'announce-dark': '#1E1E1E',
        'text-primary': '#222222',
        'text-muted': '#777777',
        'accent-gold': '#C9A227',
        'accent-sale': '#8B0000',
        'border-warm': '#E5E5E5',
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
