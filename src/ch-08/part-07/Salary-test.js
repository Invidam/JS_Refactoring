import * as before from "./Salary-before.js";
import * as after from "./Salary-after.js";

function test() {
  before.info() === after.info()
    ? console.log("C1", true)
    : console.log("C1", before.info(), after.info());
}

test();
