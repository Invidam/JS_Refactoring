class Person {
  constructor(name, genderCode) {
    this._name = name;
    this._genderCode = genderCode || "X";
  }

  get name() {
    return this._name;
  }

  get genderCode() {
    return this._genderCode;
  }
  get isMale() {
    return this.genderCode === "M";
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
function createPerson(name) {
  return new Person(name);
}

function createMale(name) {
  return new Person(name, "M");
}
function createFemale(name) {
  return new Person(name, "F");
}
function loadFromInput(data) {
  const result = [];
  return data.map(createPerson);

  function createPerson(aRecord) {
    switch (aRecord.gender) {
      case "M":
        return createMale(aRecord.name);
      case "F":
        return createFemale(aRecord.name);
      default:
        return new Person(aRecord.name);
    }
  }
}

const data = [
  { gender: "M", name: "Invidam" },
  { gender: "F", name: "may" },
  { gender: "M", name: "hsp" },
  { gender: "F", name: "mini" },
  { gender: "M", name: "pks" },
  { gender: "F", name: "cookie" },
  { gender: "F", name: "jj" },
  { gender: "M", name: "july" },
];

export const numberOfMales = () =>
  loadFromInput(data).filter((p) => p.isMale).length;
