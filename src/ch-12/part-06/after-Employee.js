class Employee {
  constructor(name) {
    this._name = name;
  }

  toString() {
    return `${this._name} (${this.type})`;
  }
}

class Engineer extends Employee {
  get type() {
    return "engineer";
  }
}
class Manager extends Employee {
  get type() {
    return "manager";
  }
}
class Salesperson extends Employee {
  get type() {
    return "salesperson";
  }
}

function createEmployee(name, type) {
  switch (type) {
    case "engineer":
      return new Engineer(name);
    case "manager":
      return new Manager(name);
    case "salesperson":
      return new Salesperson(name);
    default:
      return new TypeError("존재하지 않는 Employee 타입: ", type);
  }
}
export function result() {
  let result = "";
  result += createEmployee("Invidam", "engineer").toString();

  result += createEmployee("hsp", "manager").toString();
  result += createEmployee("who", "salesperson").toString();
  return result;
}
