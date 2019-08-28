const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas/v1/schema');

function graphServer(app, endpoint = '/graphql') {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });

  // app is from an existing express app. Mount Apollo middleware here. If no path is specified, it defaults to `/graphql`.
  apolloServer.applyMiddleware({ app, path: endpoint });
}

module.exports = graphServer;
