let Book = require('./book'); // Importing the Book constructor from book.js

// Array of book instances
const books = [
    new Book('To Kill a Mockingbird', 'Harper Lee', 1960),
    new Book('1984', 'George Orwell', 1949),
    new Book('The Great Gatsby', 'F. Scott Fitzgerald', 1925),
    new Book('Moby-Dick', 'Herman Melville', 1851)
];

module.exports = books; // Exporting the array of books
