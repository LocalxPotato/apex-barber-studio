/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{svelte,js,ts}'],
  theme: {
    extend: {
      colors: {
        sage: {
          bg: '#eae7df',
          card: '#f4f2ea',
          surface: '#dfdcd2',
          border: '#d2cebf',
          muted: '#808a7e',
        },
        pine: {
          DEFAULT: '#1b2a1a',
          hover: '#283c27',
          light: '#2d432b',
        }
      },
      fontFamily: {
        sans: ['"Instrument Sans"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
