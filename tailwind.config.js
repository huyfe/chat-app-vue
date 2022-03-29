module.exports = {
  mode: 'jit',

  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

    },
    fontFamily: {
      primary: ['Poppins', 'sans-serif'],
      second: ['Roboto', 'sans-serif'],
    },
    fontSize: {
      xs: ['10px', { lineHeight: '15px' }],
      sm: ['12px', { lineHeight: '18px' }],
      base: ['14px', { lineHeight: '21px' }],
      lg: ['16px', { lineHeight: '24px' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'light': '#e5e5e5',
      'lighter': '#f9fbfb',
      'gray': '#d0d9df',
      'grayer': '#96a9ba',
      'dark': '#52585d',
      'blue-light': '#e3f6fc',
      'blue-dark': '#6588de',
      'pink': '#f7b6b4',
      'green': '#46d362',
      'orange': '#f3ba4a',
    },
    borderRadius: {
      none: '0px',
      xs: '8px',
      sm: '9px',
      DEFAULT: '14px',
      md: '15px',
      lg: '0.5rem',
      xl: '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      full: '9999px',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      DEFAULT: '0px 8px 40px rgba(0, 72, 251, 0.3)',
      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      'blue-light': '0px 8px 40px rgba(142, 194, 208, 0.4)',
      'blue-dark': '0px 8px 40px rgba(0, 72, 251, 0.3)',
      'white': '0px 8px 40px rgba(0, 0, 0, 0.1)',
      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      none: 'none',
    },
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '0.125rem',
      1: '5px',
      2: '10px',
      3: '15px',
      4: '20px',
      5: '25px',
      6: '30px',
      7: '35px',
      8: '40px',
      9: '45px',
      10: '50px',
      11: '55px',
      12: '60px',
      13: '65px',
      14: '70px',
      15: '75px',
      16: '80px',
      17: '85px',
      18: '90px',
      19: '95px',
      20: '100px',
      60: '300px',
      70: '350px',
    },

  },
  plugins: [],
}
