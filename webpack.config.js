const path = require('path');

const SRC_DIR = path.join(__dirname, '/client');
const Public = path.join(__dirname, '/public');

module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: Public,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: SRC_DIR,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
};
