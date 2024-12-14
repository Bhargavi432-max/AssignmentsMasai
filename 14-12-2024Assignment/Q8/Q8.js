function Book(title, author, isAvailable = true) {
    this.title = title;
    this.author = author;
    this.isAvailable = isAvailable;
}

function Member(name, borrowedBooks = []) {
    this.name = name;
    this.borrowedBooks = borrowedBooks;
}

Member.prototype.borrowBook = function(book) {
    if (!book.isAvailable) {
        console.log(`${book.title} is already borrowed.`);
        return;
    }
    if (this.borrowedBooks.length >= 3) {
        console.log(`${this.name} cannot borrow more than 3 books at a time.`);
        return;
    }
    book.isAvailable = false;
    this.borrowedBooks.push(book.title);
    console.log(`${this.name} successfully borrowed ${book.title}.`);
};

function PremiumMember(name, borrowedBooks = []) {
    Member.call(this, name, borrowedBooks); 
    this.specialCollectionAccess = true; 
}

PremiumMember.prototype = Object.create(Member.prototype); // Inherit from Member

PremiumMember.prototype.borrowBook = function(book) {
    // Check if it's a special collection book and if the member is premium
    if (book.title.toLowerCase().includes("special") && !this.specialCollectionAccess) {
        console.log(`${this.name} cannot borrow special collection books.`);
        return;
    }
  
    if (this.borrowedBooks.length >= 5) {
        console.log(`${this.name} cannot borrow more than 5 books at a time.`);
        return;
    }
  
    Member.prototype.borrowBook.call(this, book); 
};

// Creating books
let book1 = new Book("JavaScript for Beginners", "John Doe");
let book2 = new Book("Advanced JavaScript", "Jane Smith");

// Creating members
let regularMember = new Member("Alice");
let premiumMember = new PremiumMember("Bob");

// Borrowing books
regularMember.borrowBook(book1);  // Alice successfully borrowed JavaScript for Beginners
regularMember.borrowBook(book2);  // Alice successfully borrowed Advanced JavaScript

premiumMember.borrowBook(book1);  // Bob successfully borrowed JavaScript for Beginners
premiumMember.borrowBook(book2);  // Bob successfully borrowed Advanced JavaScript

premiumMember.borrowBook(book1);  // Bob cannot borrow more than 5 books at a time.
