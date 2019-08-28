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
    id: String
    title: String
    author: Author
  }

  type Query {
    books: [Book]
    book(id: String!): Book
    authors: [Author]
    author(id: String!): Author
  }

  type Mutation {
    addBook(title: String!, author: String!, id: String): Book
    addAuthor(name: String!): Author
  }
`;

const resolvers = {
  Query: {
    books: () => {
      return books.head(10);
    },
    book: (parent, { id }) => {
      return books.get(id);
    },
    authors: () => {
      return authors.head(10);
    },
    author: (parent, { id }) => {
      const author = authors.get(id);
      return author;
    },
  },
  Mutation: {
    addAuthor: (_parent, { name }) => {
      // prevent duplicate names
      const match = authors.getByField('name', name);
      if (match) return match;

      // add author and return entire document
      return authors.add({ name });
    },
    addBook: (_parent, { title, author }) => {
      const match = books.getByField('title', title);
      if (match) return match;

      return books.add({ title, author });
    },
  },
  Book: {
    author: parent => {
      logger.debug('Fetch author id:', parent.author);
      return authors.get(parent.author);
    },
  },
  Author: {
    books: parent => {
      logger.debug('Fetch book id:', parent.id);
      return books.getAllByField('author', parent.id);
    },
  },
};

module.exports = {
  books,
  typeDefs,
  resolvers,
};
