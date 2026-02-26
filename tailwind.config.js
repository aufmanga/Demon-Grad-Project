/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cairo': ['Cairo', 'sans-serif'],
      },
      colors: {
        'primary-blue': '#1e88e5',
        'dark-blue': '#1565c0',
        'light-blue': '#e3f2fd',
        'sidebar-blue': '#bbdefb',
        'card-purple': '#7b1fa2',
        'card-green': '#388e3c',
        'card-orange': '#f9a825',
        'card-blue': '#1976d2',
        'bottom-orange': '#e65100',
        'bottom-green': '#64b200',
        'bottom-blue': '#42a5f5',
      }
    },
  },
  plugins: [],
}
