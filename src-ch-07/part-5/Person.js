class Telephone {
  constructor(data) {
    ({ officeAreaCode: this._areaCode, officeNumber: this._number } = data);
  }

  get areaCode() {
    return this._areaCode;
  }

  set areaCode(arg) {
    this._areaCode = arg;
  }

  get number() {
    return this._number;
  }

  set number(arg) {
    this._number = arg;
  }
  toString() {
    return `${this.areaCode}-${this.number}`;
  }
}
class Person {
  constructor(data) {
    ({
      name: this._name,
      officeAreaCode: this._officeAreaCode,
      officeNumber: this._officeNumber,
    } = data);
    const { officeAreaCode, officeNumber } = data;
    const telephoneData = { officeAreaCode, officeNumber };
    this._telephoneNumber = new Telephone(telephoneData);
  }
  get name() {
    return this._name;
  }

  set name(arg) {
    this._name = arg;
  }

  get telephoneNumber() {
    return this._telephoneNumber.toString();
  }
}

const person = new Person({
  name: "Invidam",
  officeAreaCode: 822,
  officeNumber: 6243,
});

console.log(person.telephoneNumber);
