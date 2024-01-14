/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primer-dark-gray': {
          0: '#F0F6FC',
          700: '#21262D',
          900: '#0D1117'
        }
      }
    }
  },
  plugins: []
}
