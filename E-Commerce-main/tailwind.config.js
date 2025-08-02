/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF5F1F', // Orange
        secondary: '#00B89F', // Teal
        accent: '#FF3B30', // Red
        success: '#34C759', // Green
        warning: '#FFCC00', // Yellow
        error: '#FF3B30', // Red
      },
    },
  },
  plugins: [],
};