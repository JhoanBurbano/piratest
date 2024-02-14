const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{ts,tsx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
};
