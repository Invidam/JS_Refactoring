class Employee {
  constructor(name, type) {
    this.validateType(type);

    this._name = name;
    this._type = type;
  }

  validateType(arg) {
    if (!["engineer", "manager", "salesperson"].includes(arg)) {
      throw new Error(`${arg}라는 직원 유형은 없습니다.`);
    }
  }
  toString() {
    return `${this._name} (${this._type})`;
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
