const prod = require('./environments/production');
const local = require('./environments/local');

let config = prod;

if (process.env.NODE_ENV !== 'production') {
  config = local;
}

module.exports = config;
