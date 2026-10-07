export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        seasons: ['"The Seasons"', '"Playfair Display"', "serif"],
        poppins: ['"Poppins"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: { DEFAULT: "#4f46e5", soft: "#eef0ff" },
        ink: "#0f172a",
        mist: { DEFAULT: "#f3f5fb", deep: "#e9edf7", line: "#dde3f0" },
        amir: { DEFAULT: "#EC1F36", dark: "#B9101F", ink: "#271719" },
      },
    },
  },
  plugins: [],
};
