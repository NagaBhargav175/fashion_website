/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        char: '#141414',
        smoke: '#1f1f1f',
        ash: '#2b2b2b',
        fog: '#6b6b6b',
        mist: '#9a9a9a',
        bone: '#f4f3ef',
        paper: '#e9e8e3',
        accent: {
          DEFAULT: '#39ff14',
          dark: '#1fbf0c',
          50: '#efffea',
          100: '#d7ffce',
          400: '#5cff3a',
          600: '#2bd60a',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        cond: ['Archivo', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        mega: '-0.04em',
        tightest: '-0.03em',
      },
      maxWidth: {
        edge: '1680px',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fadeIn 0.5s ease both',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16,1,0.3,1) both',
        'slide-up': 'slideUp 0.35s cubic-bezier(0.16,1,0.3,1) both',
        marquee: 'marquee 30s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
