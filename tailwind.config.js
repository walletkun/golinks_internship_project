/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        correct: "#6aaa64",
        present: "#c9b458",
        absent: "#787c7e",
        unused: "#d3d6da",
        background: "#ffffff",
        "background-dark": "#121213",
      },
      keyframes: {
        flip: {
          "0%": { transform: "rotateX(0)" },
          "50%": { transform: "rotateX(90deg)" },
          "100%": { transform: "rotateX(0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        flip: "flip 0.5s ease-in-out",
        shake: "shake 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
