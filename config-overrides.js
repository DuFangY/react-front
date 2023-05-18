const { override, addLessLoader, adjustStyleLoaders } = require('customize-cra')

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    localIdentName: '[local]--[hash:base64:5]'
  }),
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options;
    postcss.options = { postcssOptions };
  }),

)