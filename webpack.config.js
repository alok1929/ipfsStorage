const Dotenv = require('dotenv-webpack');

module.exports = {
  // Your other webpack configuration options...

  plugins: [
    new Dotenv()
  ]
};

