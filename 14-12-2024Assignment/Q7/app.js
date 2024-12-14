let books = require('./books'); // Importing the array of books from books.js

// Creating an array of book summaries using map() and getSummary method
const summaries = books.map(book => book.getSummary());

// Logging the book summaries to the console
console.log(summaries);
