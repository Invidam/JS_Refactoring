class Employee {
  constructor(name, typeCode) {
    this._name = name;
    this._typeCode = typeCode;
  }

  get name() {
    return this._name;
  }

  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }

  static get legalTypeCodes() {
    return {
      E: "Engineer",
      M: "Manager",
      S: "Salesperson",
    };
  }
}

function createEngineer(name) {
  return new Employee(name, "E");
}
function createManager(name) {
  return new Employee(name, "M");
}
function createSalesperson(name) {
  return new Employee(name, "S");
}

export function result() {
  const engineer = createEngineer("Invidam");
  const manager = createManager("HSP");
  const salesperson = createSalesperson("Pacc");
  return engineer.type + manager.type + salesperson.type;
}
