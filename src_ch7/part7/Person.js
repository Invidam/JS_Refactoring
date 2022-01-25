class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  //   get department() {
  //     return this._department;
  //   }
  set department(arg) {
    this._department = arg;
  }
  get chargeCode() {
    return this._department._chargeCode;
  }
  set chargeCode(arg) {
    this._department._chargeCode = arg;
  }
  get manager() {
    return this._department._manager;
  }
  set manager(arg) {
    this._department._manager = arg;
  }
}

class Department {
  get chargeCode() {
    return this._chargeCode;
  }
  set chargeCode(arg) {
    this._chargeCode = arg;
  }
  get manager() {
    return this._manager;
  }
  set manager(arg) {
    this._manager = arg;
  }
}
const person = new Person("Invidam");
person.department = new Department();
person.chargeCode = "DEPOSIT";
person.manager = "HSP";

console.log(person.manager);
