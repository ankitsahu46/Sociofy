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
        "mdl": "1160px",
        "md_x": {
          "min": "768px",
          "max": "1279px"
        },
        "mob": {
          "max": "768px",
        }
      }
    },
  },
  plugins: [],
}

