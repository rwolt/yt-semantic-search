/** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {},
//     colors: {
//       'deep-blue': '#003366',
//       'light-gray': '#cccccc',
//       'subtle-orange': '#ff9900',
//     },
//   },
//   plugins: [],
// };
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',

        'dark-gray': {
          50: '#f2f2f2',
          100: '#d9d9d9',
          200: '#bfbfbf',
          300: '#a6a6a6',
          400: '#8c8c8c',
          500: '#737373',
          600: '#595959',
          700: '#404040',
          800: '#262626',
          900: '#0d0d0d',
        },
        teal: {
          50: '#e6fff0',
          100: '#c2ffdb',
          200: '#94ffbd',
          300: '#61ff9b',
          400: '#2ff777',
          500: '#00eb53',
          600: '#00c440',
          700: '#00a634',
          800: '#008a2a',
          900: '#007820',
        },
        orange: {
          50: '#fff3e6',
          100: '#ffddb2',
          200: '#ffbf80',
          300: '#ffa54d',
          400: '#ff8c1b',
          500: '#ff7200',
          600: '#e65e00',
          700: '#bf4e00',
          800: '#993f00',
          900: '#7a3300',
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
