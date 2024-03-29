/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/renderer/index.html', './src/renderer/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primer-dark-gray': {
          0: '#F0F6FC',
          100: '#C9D1D9',
          200: '#B1BAC4',
          300: '#8B949E',
          400: '#6E7681',
          600: '#30363D',
          700: '#21262D',
          800: '#161B22',
          900: '#0D1117'
        },
        'primer-dark-white': '#FFFFFF',
        'primer-dark-black': '#010409',
        'primer-dark-blue': {
          400: '#388BFD',
          500: '#1F6FEB'
        },
        'primer-dark-green': {
          400: '#2EA043',
          500: '#238636'
        },

        'primer-dark-red': {
          400: '#F85149',
          500: '#DA3633'
        },
        'primer-dark-pink': {
          200: '#FF9BCE',
          400: '#DB61A2'
        }
      }
    }
  },
  plugins: []
}
