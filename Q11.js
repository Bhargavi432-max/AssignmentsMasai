function Product(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
}
Product.prototype.displayDetails = function() {
    console.log(`Name: ${this.name}, Price: $${this.price}, Quantity: ${this.quantity}`);
};
function Electronics(name, price, quantity, brand, model) {
    Product.call(this, name, price, quantity);
    
    this.brand = brand;
    this.model = model;
}
Electronics.prototype = Object.create(Product.prototype);
Electronics.prototype.constructor = Electronics;

Electronics.prototype.powerOn = function() {
    console.log(`${this.model} is now powered on.`);
};

Electronics.prototype.powerOff = function() {
    console.log(`${this.model} is now powered off.`);
};
function Clothing(name, price, quantity, size, material) {
    Product.call(this, name, price, quantity);

    this.size = size;
    this.material = material;
}

Clothing.prototype = Object.create(Product.prototype);
Clothing.prototype.constructor = Clothing;

Clothing.prototype.getSize = function() {
    console.log(`The size of this clothing item is ${this.size}.`);
};
function Books(name, price, quantity, author, genre) {
    Product.call(this, name, price, quantity);

    this.author = author;
    this.genre = genre;
}

Books.prototype = Object.create(Product.prototype);
Books.prototype.constructor = Books;

Books.prototype.getAuthor = function() {
    console.log(`The author of this book is ${this.author}.`);
};
const laptop = new Electronics("Laptop", 999.99, 10, "Apple", "MacBook Pro");
const shirt = new Clothing("Shirt", 29.99, 50, "L", "Cotton");
const book = new Books("The Great Gatsby", 10.99, 100, "F. Scott Fitzgerald", "Novel");

laptop.displayDetails();
shirt.displayDetails();
book.displayDetails();

laptop.powerOn();
laptop.powerOff();

shirt.getSize();

book.getAuthor();
