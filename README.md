# graph-server-demo

Little graph server demo. Apollo server running in an Express app.

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/w33ble/graph-server-demo/master/LICENSE)
[![Project Status](https://img.shields.io/badge/status-experimental-orange.svg)](https://nodejs.org/api/documentation.html#documentation_stability_index)

## Setup

Install packages and seed the data:

```sh
yarn
node populate.js
```

The "database" here is just flat JSON files and a simple module to query and modify their data.

## Usage

`yarn start` will start an Express server with an Apollo GraphQL server attached. There are no Express routes, but 2 graph routes.

Endpoint | Description
-------- | -----------
`/graph` | The first version of the API, it only exposes a `books` query and author data is just part of the book document
`/v2/graph` | The second version of the API, exposing `book`, `books`, and `author` queries, as well as mutations to add books and authors.

The goal here was to expose two different graphs from a single server, mostly to prove that it could be done. I was also trying to learn how to write resolvers that dealt with mapping, so I could join two (or more) documents into the same query. The "v2" graph was a nice way to add that while still having the basic use case available in "v1".

## Querying

### v1

This only exposes `books`, which you can query like so:

```gql
query {
  books {
    id
    title
    author
  }
}
```

### v2

This exposes `book`, `books`, and `authors`, and joins books and authors together. Here's an extensive query to show how they work:

```gql
query {
  books {
    id
    title
    author {
      id
      name
    }
  }

  book(id: "x7174v9cof") {
    title
    author {
      name
    }
  }

  authors {
    id
    name
  }

  author(id: "ls5xcds8ln") {
    id
    name
    books {
      id
      title
      author {
        name
      }
    }
  }
}
```

You can also use a mutation to add new books and authors. Here's a valid way to use the addBook mutation:

```gql
mutation {
  addBook(title: "Ender's Game", author: "mlqnnsc8rq") {
    id
    title
    author {
      id
      name
    }
  }
}
```

## Resources

- [A Beginner’s Guide to GraphQL](https://www.freecodecamp.org/news/a-beginners-guide-to-graphql-86f849ce1bec/)
- [GraphQL Server Tutorial with Apollo Server and Express](https://www.robinwieruch.de/graphql-apollo-server-tutorial)

## License

MIT © [w33ble](https://github.com/w33ble)
