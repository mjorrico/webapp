const path = require('path');

module.exports = {
  entry: './natural_sql/static/scripts/submit.js',
  output: {
    path: path.resolve(__dirname, 'natural_sql/static/scripts'),
    filename: 'bundle.js',
  },
  mode: 'development'
};
