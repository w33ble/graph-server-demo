const pino = require('pino')({
  name: 'graphql-demo',
  level: 'info',
  prettyPrint: true,
});

module.exports = pino;
