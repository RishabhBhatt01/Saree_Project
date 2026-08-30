/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF6F0",
        oxblood: {
          DEFAULT: "#7B2A2A",
          dark: "#5E1F1F",
          light: "#9A4444",
        },
        teal: {
          DEFAULT: "#1F4B43",
          dark: "#153631",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E0C25E",
        },
        ink: "#2B2622",
        sand: "#EFE7DA",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
