module.exports = {
  important: true,
  //Purging for Production is configured in PostCSS Config
  // purge:{
  //   content: ["./src/**/*.html", "./src/**/*.jsx", "./src/**/*.js"],
  // },
  theme: {
    extend: {},
  },
  variants: {
    backgroundColor: ['responsive', 'odd', 'hover', 'focus'],
  },
  plugins: [],
};
