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
          light: '#ff6b6b',
          DEFAULT: '#ff4757',
          dark: '#ff3e4d',
        },
        secondary: {
          light: '#ff9ff3',
          DEFAULT: '#ff7eb3',
          dark: '#ff6b9b',
        },
        accent: {
          light: '#feca57',
          DEFAULT: '#ffa502',
          dark: '#ff9f43',
        },
        background: '#f9f1f0',
        text: '#2f3542',
      },
      gradientColorStops: theme => ({
        'primary-gradient-start': '#ff6b6b',
        'primary-gradient-end': '#ff3e4d',
      }),
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
}