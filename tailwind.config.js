/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tiktok': {
          'pink': '#ff0050',
          'blue': '#00f2ea',
          'dark': '#000000',
          'light': '#ffffff',
          'gradient-start': '#ff0050',
          'gradient-end': '#00f2ea',
          'bg-dark': '#0f0f0f',
          'bg-light': '#f8f9fa',
          'text-primary': '#1a1a1a',
          'text-secondary': '#666666'
        }
      },
      backgroundImage: {
        'tiktok-gradient': 'linear-gradient(45deg, #ff0050 0%, #00f2ea 100%)',
        'tiktok-gradient-horizontal': 'linear-gradient(90deg, #ff0050 0%, #00f2ea 100%)',
        'tiktok-gradient-radial': 'radial-gradient(circle, #ff0050 0%, #00f2ea 100%)'
      },
      animation: {
        'tiktok-pulse': 'tiktok-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'tiktok-bounce': 'tiktok-bounce 1s infinite',
        'tiktok-shimmer': 'tiktok-shimmer 2s linear infinite'
      },
      keyframes: {
        'tiktok-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' }
        },
        'tiktok-bounce': {
          '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' }
        },
        'tiktok-shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    },
  },
  plugins: [],
}