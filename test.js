class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  displayName() {
    console.log(`My name is ${this.name}`);
  }
}

const gabby = new Person("Gabriel", 25);
gabby.displayName();
const caleb = new Person("Caleb", 23);
const emma = new Person("Emma", 22);

caleb.displayName();
emma.displayName();
// console.log(gabby);

const gabby2 = {
  name: "Gabriel 2",
  age: 25,
  displayName: function () {
    console.log(`My name is ${this.name}`);
  },
};

// const caleb = {
//   name: "Caleb",
//   age: 23,
//   displayName: function () {
//     console.log(`My name is ${this.name}`);
//   },
// };

// gabby2.displayName();
// caleb.displayName();
