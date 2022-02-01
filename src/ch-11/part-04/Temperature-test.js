import { checkRangeOf as Before } from "./Temperature-before.js";
import { checkRangeOf as After } from "./Temperature-after.js";

function test(before, after) {
  before === after ? console.log(true) : console.log(before, after);
}

function testByStringify(before, after) {
  JSON.stringify(before) === JSON.stringify(after)
    ? console.log(true)
    : console.log(before, after);
}

// console.log(checkRangeOf(room1, plan));

const room1 = { daysTempRange: { low: 18, high: 28 } };
test(Before(room1), After(room1));

const room2 = { daysTempRange: { low: 20, high: 21 } };
test(Before(room2), After(room2));
//testByStringify()
