function Car(){
    this.make="Toyota";
    this.model="Corolla";
    this.year=2020;
    this.type="Sedan";
    this.isAvailable=true;
}
function Customer(){
    this.name="Bhargavi";
    this.rentedCars=[];
}
Customer.prototype.rentCar=function(car){
    if(car.isAvailable){
        car.isAvailable=false;
        this.rentedCars.push(car);
    }else{
        console.log("Car is already rented!");
    }
}
Customer.prototype.returnCar=function(car){
    let carIndex=this.rentedCars.indexOf(car);
    if(carIndex>-1){
        setTimeout(() => {
            car.isAvailable = true;
            this.rentedCars.splice(carIndex, 1);
            console.log(`${this.name} returned the ${car.make} ${car.model}.`);
        }, 2000);
    }else {
        console.log(`${this.name} has not rented this car.`);
    }
}
function PremiumCustomer(){
    Customer.call(this);
    this.discountRate=10;
}
PremiumCustomer.prototype = Object.create(Customer.prototype);  // Set up inheritance
PremiumCustomer.prototype.constructor = PremiumCustomer;
function calculateRentalPrice(car, days, customer) {
    const baseRate = 50;
    let typeMultiplier = 1; 
    if (car.type === "SUV") {
        typeMultiplier = 1.5;
    } else if (car.type === "Luxury") {
        typeMultiplier = 2;
    }

    let price = baseRate * typeMultiplier * days;
    if (customer instanceof PremiumCustomer) {
        price *= 1 - customer.discountRate / 100;
    }

    return price;
}
function Maintenance(car, delay) {
    console.log(`The ${car.make} ${car.model} is under maintenance.`);
    setTimeout(() => {
        car.isAvailable = true;
        console.log(`The ${car.make} ${car.model} is now available after maintenance.`);
    }, delay);
}
let car1 = new Car("Toyota", "Corolla", 2020, "Sedan");
let car2 = new Car("Honda", "CR-V", 2021, "SUV");
let car3 = new Car("Mercedes", "S-Class", 2022, "Luxury");
const customer1 = new Customer("Alice");
const premiumCustomer = new PremiumCustomer("Bob", 10);

// Renting cars
customer1.rentCar(car1);
premiumCustomer.rentCar(car2);
premiumCustomer.rentCar(car3);

// Calculate rental price
console.log(`Rental price for Alice: $${calculateRentalPrice(car1, 3, customer1)}`);
console.log(`Rental price for Bob: $${calculateRentalPrice(car2, 3, premiumCustomer)}`);

// Returning cars
customer1.returnCar(car1);
premiumCustomer.returnCar(car2);

// Maintenance
Maintenance(car3, 3000);