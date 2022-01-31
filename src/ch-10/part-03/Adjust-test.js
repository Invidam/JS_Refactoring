import { adjustedCapital as Before } from "./Adjust-before.js";
import { adjustedCapital as After } from "./Adjust-after.js";

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

const instruments = [
  {
    capital: 20,
    interestRate: 0.3,
    duration: 12,
    income: 4000,
    adjustmentFactor: 0.1,
  },
  {
    capital: 0,
    interestRate: 0.2,
    duration: 6,
    income: 80,
    adjustmentFactor: 0.8,
  },
  {
    capital: 10,
    interestRate: 0.6,
    duration: 0,
    income: 1200,
    adjustmentFactor: 0.5,
  },
  {
    capital: 5,
    interestRate: 0.7,
    duration: 5,
    income: 600,
    adjustmentFactor: 0.2,
  },
];

testByStringify(instruments.map(Before), instruments.map(After));
