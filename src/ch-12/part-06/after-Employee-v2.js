class Employee {
  constructor(name, type) {
    this.validateType(type);

    this._name = name;
    this.type = type;
  }

  validateType(arg) {
    if (!["engineer", "manager", "salesperson"].includes(arg)) {
      throw new Error(`${arg}라는 직원 유형은 없습니다.`);
    }
  }
  toString() {
    return `${this._name} (${this.typeString})`;
  }
  get type() {
    return this._type;
  }
  set type(arg) {
    this._type = Employee.createEmployeeType(arg);
  }
  get typeString() {
    return this._type.toString();
  }
  static createEmployeeType(aString) {
    switch (aString) {
      case "engineer":
        return new Engineer(aString);
      case "manager":
        return new Manager(aString);
      case "salesperson":
        return new Salesperson(aString);
      default:
        return new TypeError("존재하지 않는 Employee 타입: ", aString);
    }
  }
}
class EmployeeType {
  constructor(aString) {
    this._value = aString;
  }
  toString() {
    return this._value;
  }
}
class Engineer extends EmployeeType {
  toString() {
    return "engineer";
  }
}
class Manager extends EmployeeType {
  toString() {
    return "manager";
  }
}
class Salesperson extends EmployeeType {
  toString() {
    return "salesperson";
  }
}
function createEmployee(name, type) {
  return new Employee(name, type);
}
export function result() {
  let result = "";
  result += createEmployee("Invidam", "engineer").toString();

  result += createEmployee("hsp", "manager").toString();
  result += createEmployee("who", "salesperson").toString();
  return result;
}
