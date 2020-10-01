const path = require('path');
const withImages = require('next-images')
module.exports = withImages({
  exclude: path.resolve(__dirname, '/Image'),
  webpack(config, options) {
    return config
  }
})
