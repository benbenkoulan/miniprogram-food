module.exports = {
    plugins: [
        require('postcss-import')({ path: ['./src/styles'] }),
        require('postcss-preset-env'),
        require('autoprefixer'),
        require('postcss-nested'),
        require('postcss-mixins'),
    ]
  }
  