class Party {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  get annualCost() {
    return this.monthlyCost * 12;
  }
}
class Department extends Party {
  constructor(name, staff) {
    super(name);
    this._staff = staff;
  }

  get staff() {
    return this._staff.slice();
  }

  get monthlyCost() {
    return this.staff
      .map((e) => e.monthlyCost)
      .reduce((sum, cost) => sum + cost);
  }

  get headCount() {
    return this.staff.length;
  }
}

class Employee extends Party {
  constructor(name, id, monthlyCost) {
    super(name);
    this._id = id;
    this._monthlyCost = monthlyCost;
  }

  get monthlyCost() {
    return this._monthlyCost;
  }

  get name() {
    return this._name;
  }

  get id() {
    return this._id;
  }
}

const employee = new Employee("Invidam", "pacc7255", 3000);
const department = new Department("hsp", [
  new Employee("Invidam", "pacc7255", 3000),
  new Employee("hsp", "hsp2959", 3000),
  new Employee("kaiser", "july", 999000),
  new Employee("pom", "pom123123", 432500000),
  new Employee("Cicero", "cicero0103", 7000000),
]);

export function result() {
  return JSON.stringify(employee, 0, " ") + JSON.stringify(department, 0, "  ");
}
