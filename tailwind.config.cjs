const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app.html", "./src/**/*.{svelte,ts}"],
  theme: {
    screens: {
      xs: "480px",
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      screens: {
        DEFAULT: "1440px",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "hsl(0, 0%, 98%)",
      black: "hsl(0, 0%, 5%)",
      primary: "hsl(180, 66%, 49%)",
      secondary: "hsl(257, 27%, 26%)",
      error: "hsl(0, 87%, 67%)",
      neutral: {
        DEFAULT: "hsl(225,33%,95%)",
        100: "hsl(0, 0%, 75%)",
        200: "hsl(257, 7%, 63%)",
        300: "hsl(255, 11%, 22%)",
        400: "hsl(260, 8%, 14%)",
      },
    },
    fontWeight: {
      normal: "500",
      bold: "700",
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "clamp-h1": ["clamp(2.75rem, calc(-0.48rem + 6.74vw), 6.00rem)", 1.15],
        "clamp-h2": ["clamp(2.25rem, calc(1.13rem + 2.34vw), 3.00rem)", 1.05],
      },
    },
  },
  plugins: [],
};
