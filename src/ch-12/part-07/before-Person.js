class Person {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get genderCode() {
    return "X";
  }

  // 생략
}

class Male extends Person {
  get genderCode() {
    return "M";
  }
}

class Female extends Person {
  get genderCode() {
    return "F";
  }
}
const people = [
  new Male(),
  new Female(),
  new Male(),
  new Female(),
  new Male(),
  new Female(),
  new Female(),
  new Male(),
];
export const numberOfMales = () =>
  people.filter((p) => p instanceof Male).length;
