const path = require('path');

module.exports = {
  mode: 'development',  // or 'production'
  entry: './js/src/index.js',  // Correct path to your entry file
  output: {
    filename: 'bundle.js',   // The output bundled file
    path: path.resolve(__dirname, 'js/dist')  // Output directory (inside js/)
  },
  module: {
    rules: [
      {
        test: /\.js$/,             // Process JavaScript files
        exclude: /node_modules/,   // Don't transpile node_modules
        use: {
          loader: 'babel-loader'   // Use Babel to transpile JS
        }
      }
    ]
  }
};
