/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Your Custom Luxury Palette
        creme: {
          50: '#FDFBF9',
          100: '#F8F4F0',
          DEFAULT: '#EEE4DA', // Base Creme
          300: '#E5D6C7',
          400: '#DEC9B5',
        },
        sand: {
          DEFAULT: '#D8C4AC', // Base Sand
          light: '#E5D7C5',
          dark: '#BFA88E',
        },
        dustyPink: {
          DEFAULT: '#C8A49F', // Base Dusty Pink
          light: '#D9BCB8',
          dark: '#B28882',
        },
        burgundy: {
          DEFAULT: '#4D0E13', // Base Burgundy
          light: '#6E1B22',
          dark: '#2D0609',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
        editorial: ['"Italiana"', 'serif'],
      },
      boxShadow: {
        'soft-glow': '0 20px 40px -15px rgba(200, 164, 159, 0.25)',
        'luxury': '0 30px 60px -20px rgba(77, 14, 19, 0.12), 0 10px 20px -10px rgba(77, 14, 19, 0.06)',
      },
      letterSpacing: {
        luxury: '.22em',
      },
    },
  },
  plugins: [],
};