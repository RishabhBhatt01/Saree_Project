/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF6F0",
        oxblood: { DEFAULT: "#7B2A2A", dark: "#5E1F1F", light: "#9A4444" },
        teal: { DEFAULT: "#1F4B43", dark: "#153631" },
        gold: { DEFAULT: "#C9A227", light: "#E0C25E" },
        ink: "#2B2622",
        sand: "#EFE7DA",
        clay: "#A8552F",
        turmeric: "#D9A21B",
        linen: "#F3EBDD",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Work Sans", "sans-serif"],
      },
      backgroundImage: {
        weave:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6'%3E%3Cpath d='M0 0h6M0 3h6' stroke='%232B2622' stroke-opacity='0.035'/%3E%3Cpath d='M0 0v6M3 0v6' stroke='%232B2622' stroke-opacity='0.03'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};