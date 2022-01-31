import { payAmount as Before } from "./Pay-before.js";
import { payAmount as After } from "./Pay-after.js";

function test(before, after) {
  before === after ? console.log(true) : console.log(before, after);
}

function testByStringify(before, after) {
  JSON.stringify(before) === JSON.stringify(after)
    ? console.log(true)
    : console.log(before, after);
}
// test();
//testByStringify()

class Employee {
  constructor(isSeparated, isRetired) {
    this._isSeparated = isSeparated;
    this._isRetired = isRetired;
  }
  get isSeparated() {
    return this._isSeparated;
  }
  get isRetired() {
    return this._isRetired;
  }
}

const employees = [
  new Employee(true, true),
  new Employee(true, false),
  new Employee(false, true),
  new Employee(false, false),
];

// console.log();
testByStringify(employees.map(Before), employees.map(After));
