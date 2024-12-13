function Animal(){
    this.type="Animal";
}
Animal.prototype.sound=function(){
    console.log("Animal Sound");
}
function Dog(){
    Animal.call(this);
    this.type="Dog";

}
Dog.prototype.sound=function (){
    console.log("Bark");
}
let myDog=new Dog();
myDog.sound();