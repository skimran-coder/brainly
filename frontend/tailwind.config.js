/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          primaryBtn: "#5046e4",
          secondaryBtn: "#e0e7ff",
          main: "#f9fafb",
          tag: "#eef2ff"
        },
        text: {
          primaryBtn: "#dbd9f9",
          secondaryBtn: "#6058d3",
          primary: "#1f2937",
          secondary: "#48515f",
          tag: "#1f2937"
        },
      },
    },
  },
  plugins: [],
};
