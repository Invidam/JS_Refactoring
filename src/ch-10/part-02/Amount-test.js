import { disabilityAmount as Before } from "./Amount-before.js";
import { disabilityAmount as After } from "./Amount-after.js";
function test(before, after) {
  before === after ? console.log(true) : console.log(before, after);
}

function testByStringify(before, after) {
  JSON.stringify(before) === JSON.stringify(after)
    ? console.log(true)
    : console.log(before, after);
}

class Employee {
  constructor(seniority, monthDisabled, isPartTime, salary) {
    this._seniority = seniority;
    this._monthDisabled = monthDisabled;
    this._isPartTime = isPartTime;
    this._salary = salary;
  }
  get seniority() {
    return this._seniority;
  }
  get monthDisabled() {
    return this._monthDisabled;
  }
  get isPartTime() {
    return this._isPartTime;
  }
  get salary() {
    return this._salary;
  }
}

const employees = [
  new Employee(8, 2, false, 3000),
  new Employee(1, 0, false, 1200),
  new Employee(0, 0, true, 200),
  new Employee(6, 15, false, 1800),
  new Employee(4, 1, false, 1400),
];

testByStringify(employees.map(Before), employees.map(After));
