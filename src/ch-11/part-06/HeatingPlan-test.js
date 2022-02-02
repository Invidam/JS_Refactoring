import { set as Before } from "./HeatingPlan-before.js";
import { set as After } from "./HeatingPlan-after.js";

function test(before, after) {
  before === after ? console.log(true) : console.log(before, after);
}

function testByStringify(before, after) {
  JSON.stringify(before) === JSON.stringify(after)
    ? console.log(true)
    : console.log(before, after);
}
// test();
testByStringify(Before(), After());
