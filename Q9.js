function Person(){
    this.name="Bhargavi",
    this.age=23
}
Person.prototype.introduce=function(){
    console.log(`Hi, my name is ${this.name} and I am ${this.age} years old.`);
}
function Employee(){
    Person.call(this);
    this.jobTitle="ASE"
}
Employee.prototype.work=function(){
    console.log(`${this.name} is working as a ${this.jobTitle}.`)
}
let persion1=new Person();
let employe1=new Employee();
persion1.introduce();
employe1.work();