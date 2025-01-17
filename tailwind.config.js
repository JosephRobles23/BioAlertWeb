/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        tremor: {
          brand: {
            faint: "#0B4619",
            muted: "#16A34A",
            subtle: "#22C55E",
            DEFAULT: "#4ADE80",
            emphasis: "#86EFAC",
            inverted: "#000000",
          },
        },
      },
    },
  },
  plugins: [],
};