import { baseCharge as Before } from "./Charge-before.js";
import { baseCharge as After } from "./Charge-after.js";

function test(before, after) {
  before === after ? console.log(true) : console.log(before, after);
}

function testByStringify(before, after) {
  JSON.stringify(before) === JSON.stringify(after)
    ? console.log(true)
    : console.log(before, after);
}
test();
const values = [50, 80, 130, 190, 200, 250];
const transformedValues = (callback) => values.map(callback);
testByStringify(transformedValues(Before), transformedValues(After));
