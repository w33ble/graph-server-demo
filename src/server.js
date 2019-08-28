const pino = require('pino')({
  name: 'graphql-demo',
  level: 'info',
  prettyPrint: true,
});
const express = require('express');
const expressPino = require('express-pino-logger')({
  logger: pino,
});

const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas/v1/schema');

const serverOptions = {
  port: process.env.PORT || 8081,
};

function server() {
  const app = express();
  // Additional middleware can be mounted at this point to run before Apollo.
  app.use(expressPino);
  // app.use('*', jwtCheck, requireAuth, checkScope);

  const apolloServer = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
  });

  // app is from an existing express app. Mount Apollo middleware here. If no path is specified, it defaults to `/graphql`.
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.listen(serverOptions, () => pino.info(`🚀 Server ready port ${serverOptions.port}`));
}

module.exports = server;
