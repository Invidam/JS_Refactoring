import { result as Before } from "./before-Calculate.js";
import { result as After } from "./after-Calculate.js";

function test(before, after) {
  before === after ? console.log(true) : console.log(before, after);
}

function testByStringify(before, after) {
  JSON.stringify(before) === JSON.stringify(after)
    ? console.log(true)
    : console.log(before, after);
}
const rightOrderData = {
  country: "KR",
};

const wrongOrderData = {
  country: "KP",
};

// test(Before(),After());
testByStringify(Before(rightOrderData), After(rightOrderData));
testByStringify(Before(wrongOrderData), After(wrongOrderData));
