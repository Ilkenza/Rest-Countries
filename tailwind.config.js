/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg_light: "#f6f8fa",
        bg_dark: "#202C37",
        input_light: "#858585",
        el_dark: "#2B3945",
        text_light: "#111517",
        white: "#fff",
      },
      fontFamily: {
        Nunito_Sans: "Nunito Sans, sans-serif",
      },

    },
  },
  plugins: [],
}