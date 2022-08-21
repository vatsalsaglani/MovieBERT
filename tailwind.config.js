/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        comforta: ["Comfortaa", "cursive"],
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("daisyui-tailwind-scrollbar"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],

  // daisyUI config

  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
  },
};
