const { gql } = require('apollo-server');
const Data = require('../../lib/data');
const logger = require('../../lib/logger');

const books = new Data('books2.json');
const authors = new Data('authors2.json');

const typeDefs = gql`
  type Author {
    id: String
    name: String
    books: [Book]
  }

  type Book {
    title: String
    author: Author
    id: String
  }

  type Query {
    books: [Book]
    book(id: String!): Book
    author(id: String!): Author
  }

  type Mutation {
    addBook(title: String!, author: String!, id: String): Book
    addAuthor(name: String!): Author
  }
`;

const resolvers = {
  Query: {
    books: () => books.head(10),
    book: (_root, { id }) => {
      const book = books.get(id);
      // if (!book) throw new Error('no such book');
      return book;
    },
    author: (root, { id }) => {
      const author = authors.get(id);
      return author;
    },
  },
  Mutation: {
    addAuthor: (_root, { name }) => {
      // prevent duplicate names
      const match = authors.getByField('name', name);
      logger.info('has match', { match });
      if (match) return match;

      // add author and return entire document
      return authors.add({ name });
    },
  },
};

module.exports = {
  books,
  typeDefs,
  resolvers,
};
