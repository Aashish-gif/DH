/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070b10',
          900: '#0d1219',
          800: '#141c28',
          700: '#1a2535',
        },
        moss: {
          100: '#d4efde',
          200: '#b4e0c6',
          300: '#8fd4a8',
          400: '#6fbf8e',
          500: '#3d9b6a',
          600: '#2d7a52',
          700: '#205c3e',
        },
        sand: {
          50: '#f8f6f2',
          100: '#efe9df',
          200: '#ddd4c8',
        },
      },
      fontFamily: {
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-mesh':
          'radial-gradient(ellipse 80% 60% at 15% 35%, rgba(111,191,142,0.22), transparent), radial-gradient(ellipse 70% 50% at 85% 15%, rgba(61,155,106,0.2), transparent), radial-gradient(ellipse 60% 45% at 55% 95%, rgba(143,212,168,0.14), transparent)',
        'admin-mesh':
          'radial-gradient(ellipse 60% 50% at 10% 20%, rgba(111,191,142,0.14), transparent), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(61,155,106,0.14), transparent)',
        'gradient-brand': 'linear-gradient(135deg, #b4e0c6 0%, #6fbf8e 50%, #3d9b6a 100%)',
        'gradient-btn': 'linear-gradient(135deg, #3d9b6a 0%, #2d7a52 100%)',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(111,191,142,0.35)',
        'glow-soft': '0 0 28px -8px rgba(143,212,168,0.3)',
        card: '0 24px 80px -32px rgba(0,0,0,0.55)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(-4px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-up-delay': 'fade-up 0.7s ease-out 0.15s both',
        'fade-up-late': 'fade-up 0.7s ease-out 0.3s both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'scale-in': 'scale-in 0.18s ease-out both',
        shimmer: 'shimmer 4s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
