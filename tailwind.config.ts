import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F7CFF',
          50:  '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          500: '#4F7CFF',
          600: '#3B6AEE',
          700: '#2D5AD6',
        },
        gold: {
          DEFAULT: '#F6C453',
          50:  '#FFFBEB',
          100: '#FEF3C7',
          400: '#F6C453',
          500: '#F0A500',
        },
        success: { DEFAULT: '#2ECC71', light: '#D1FAE5' },
        danger:  { DEFAULT: '#FF5C5C', light: '#FEE2E2' },
        surface: {
          DEFAULT: '#F7F8FA',
          card:    '#FFFFFF',
          hover:   '#F3F4F6',
          border:  '#E8EAED',
        },
        ink: {
          DEFAULT:   '#1B1B1F',
          secondary: '#6E7380',
          muted:     '#9CA3AF',
          disabled:  '#C9CDD4',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '28px',
      },
      boxShadow: {
        card:    '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05)',
        float:   '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        glow:    '0 0 0 3px rgba(79,124,255,0.18)',
        'glow-gold': '0 0 0 3px rgba(246,196,83,0.25)',
      },
      animation: {
        'fade-in':   'fadeIn 0.3s ease-out',
        'slide-up':  'slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        'slide-in':  'slideIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        'pulse-soft':'pulseSoft 2s ease-in-out infinite',
        'shimmer':   'shimmer 1.8s linear infinite',
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' },                          to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } },
        slideIn:   { from: { opacity: '0', transform: 'translateX(-12px)' }, to: { opacity: '1', transform: 'none' } },
        pulseSoft: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
        shimmer:   { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
}

export default config
