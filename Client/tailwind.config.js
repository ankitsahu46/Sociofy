/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "xs": "460px",
        "sm_max": {
          "max": "640px"
        },
        "mdl": "1160px",
        "md_x": {
          "min": "768px",
          "max": "1279px"
        },
        "mob": {
          "max": "768px",
        },
        "llg": {
          "max": "1024px"
        }
      },
      keyframes: {
        fadeInFadeOut: {
          '0%': {
            opacity: '0',
          },
          '10%, 90%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0'
          }
        }
      },
      animation: {
        fadeInFadeOut: "fadeInFadeOut 3s ease-in-out backwards",
      }
    },
  },
  plugins: [],
}

