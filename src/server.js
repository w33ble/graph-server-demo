const express = require('express');
const expressPino = require('express-pino-logger');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const logger = require('./lib/logger');
const graphServerV1 = require('./graph-v1');
const graphServerV2 = require('./graph-v2');

const serverOptions = {
  port: process.env.PORT || 8081,
};

function server() {
  const app = express();
  app.use(
    expressPino({
      logger,
      useLevel: 'debug',
    })
  );
  app.use(helmet());
  app.use(bodyParser.json());

  graphServerV1(app, '/graphql');
  graphServerV2(app, '/v2/graphql');

  app.listen(serverOptions, () => logger.info(`🚀 Server ready port ${serverOptions.port}`));
}

module.exports = server;
