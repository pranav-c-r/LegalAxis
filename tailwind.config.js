// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iconbg: '#f3cf1a',           // ICONS BACKGROUND
        page: '#010101',             // MAIN PAGE BG
        greybg: '#1a1a1a',           // bg grey
        textcolor: '#FFFFFF',        // all text color
        boxbg: '#343535',            // box components background
        // Keep some legacy colors for gradual transition
        primary: '#f3cf1a',
        secondary: '#343535',
        accent: '#1a1a1a',
        background: '#010101',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideIn': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}