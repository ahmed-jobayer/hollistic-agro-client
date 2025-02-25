/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        primaryColor: "#e11a2b"
      },
      keyframes:{
        shake:{
          '0%, 100%': {transform: 'translateX(0)'},
          '25%': {transform: 'translateX(-10px)'},
          '75%': {transform: 'translateX(10px)'},
        },
      },
      animation:{
        shake: 'shake 0.5s ease-in-out'
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light"],
  },
};
