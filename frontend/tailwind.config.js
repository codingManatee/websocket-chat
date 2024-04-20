// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Enable dark mode
  theme: {
    extend: {
      // You can extend your theme here if needed
    },
  },
  plugins: [require("daisyui")],
};
