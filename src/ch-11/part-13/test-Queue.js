import { result as Before } from "./before-Queue.js";
import { result as After } from "./after-Queue.js";

function test(before, after) {
  before === after ? console.log(true) : console.log(before, after);
}

function testByStringify(before, after) {
  JSON.stringify(before) === JSON.stringify(after) + 1
    ? console.log(true)
    : console.log(before, after);
}

// test(Before(),After());
testByStringify(Before([1, 2, 3, 4, 5]), After([1, 2, 3, 4, 5]));

testByStringify(Before(), After());
