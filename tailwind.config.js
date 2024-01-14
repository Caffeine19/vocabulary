/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primer-dark-gray': {
          0: '#F0F6FC',
          100: '#C9D1D9',
          200: '#B1BAC4',
          400: '#6E7681',
          600: '#30363D',
          700: '#21262D',
          900: '#0D1117'
        },
        'primer-dark-white': '#FFFFFF',
        'primer-dark-blue': {
          500: '#1F6FEB'
        }
      }
    }
  },
  plugins: []
}
