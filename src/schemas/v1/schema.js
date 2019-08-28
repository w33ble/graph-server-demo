const { gql } = require('apollo-server');
const Data = require('../../lib/data');

const books = new Data('books.json');

const typeDefs = gql`
  type Book {
    title: String
    author: String
    id: String
  }

  type Query {
    books: [Book]
  }
`;

const resolvers = {
  Query: {
    books: () => books.head(10),
  },
};

module.exports = {
  books,
  typeDefs,
  resolvers,
};
