class User{
    constructor(name,email){
        this.name=name;
        this.email=email;
    }
    getDetails(){
        console.log(`Name: ${this.name}, Email: ${this.email}`);
    }
}
class Student extends User {
    constructor(name, email, studentId) {
      super(name, email); // Call the constructor of the parent class
      this.studentId = studentId;
    }
  
    enroll() {
      console.log(`Student ${this.name} has enrolled.`);
    }
  }

class Instructor extends User {
  constructor(name, email, instructorId) {
    super(name, email); // Call the constructor of the parent class
    this.instructorId = instructorId;
  }

  assignGrade() {
    console.log(`Instructor ${this.name} assigned a grade.`);
  }
}
const student1 = new Student("Bhargavi", "bhargavi@example.com", "S123");
student1.getDetails(); 
student1.enroll();  
const instructor1 = new Instructor("ChandraShekar", "ChandraShekar@example.com", "I456");
instructor1.getDetails(); 
instructor1.assignGrade();