const Data = require('./src/lib/data');

// v1 data
const books = [
  { id: 'wz7n05wzbv', title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling' },
  { id: '5lcwdxff0u', title: 'Jurassic Park', author: 'Michael Crichton' },
  { title: 'Fox in Socks', author: 'Dr. Seuss', id: 'x7174v9cof' },
];

const bookData = new Data('books.json');
books.forEach(book => bookData.add(book));

// v2 data
const books2 = [
  { id: 'wz7n05wzbv', title: 'Harry Potter and the Chamber of Secrets', author: '0zionml24p' },
  { id: '5lcwdxff0u', title: 'Jurassic Park', author: 'ls5xcds8ln' },
  { title: 'Fox in Socks', author: 'rvsv94mnwf', id: 'x7174v9cof' },
  { title: 'Radical Candor', author: 'uklwto9pa5', id: 'vczt1gtmv1' },
];

const bookData2 = new Data('books2.json');
books2.forEach(book => bookData2.add(book));

const authors2 = [
  { name: 'Orson Scott Card', id: 'mlqnnsc8rq' },
  { name: 'Kim Scott', id: 'uklwto9pa5' },
  { name: 'J.K. Rowling', id: '0zionml24p' },
  { name: 'Michael Crichton', id: 'ls5xcds8ln' },
  { name: 'Dr. Seuss', id: 'rvsv94mnwf' },
];

const authorData2 = new Data('authors2.json');
authors2.forEach(author => authorData2.add(author));
