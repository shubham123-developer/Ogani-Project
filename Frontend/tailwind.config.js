import { BsDisplay } from 'react-icons/bs';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideInView: {
          "0%":{
            transform: 'translate(-100%)'
          },
          "100%":{
            transform: 'translate(0)'
          }
        }
      },
      animation: {
        slideInView: "slideInView 0.2s ease-in-out"
      },

      colors:{
        "primaryGreen": "#7fad39",
      }
    },
  },
  plugins: [],
}

