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

const engineer = new Employee("Invidam", "E");
const manager = new Employee("HSP", "M");
const salesperson = new Employee("Pacc", "S");

export function result() {
  const engineer = new Employee("Invidam", "E");
  const manager = new Employee("HSP", "M");
  const salesperson = new Employee("Pacc", "S");
  return engineer.type + manager.type + salesperson.type;
}
