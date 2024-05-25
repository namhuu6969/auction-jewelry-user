/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      lineHeight: {
        none: '1', // Typically, 'none' is represented by a line-height of 1
      },
    },
  },
  plugins: [],
};
