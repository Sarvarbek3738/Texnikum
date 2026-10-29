/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#0F2A6B',
          950: '#082F49',
        },
        accent: {
          day: '#F5B301',
          'day-light': '#FBBF24',
          dual: '#F97316',
          'dual-light': '#FB923C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
      borderRadius: {
        button: '10px',
        card: '16px',
        modal: '20px',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
