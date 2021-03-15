module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'offwhite':'#F6F6F6',
        blue: {
          'bright':'#1DA1F2'
        }
      },
      cursor:{
        grab: 'grab',
        grabbing: 'grabbing'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
