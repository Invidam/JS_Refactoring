import { rating as Before } from "./Rating-before.js";
import { rating as After } from "./Rating-after.js";

const voyage = {
  zone: "중국",
  length: 10,
};

const history = [
  {
    zone: "동인도",
    profit: 5,
  },
  {
    zone: "서인도",
    profit: 15,
  },
  {
    zone: "중국",
    profit: -2,
  },
  {
    zone: "서아프리카",
    profit: 7,
  },
];

function test(before, after) {
  before === after ? console.log(true) : console.log(before, after);
}

function testByStringify(before, after) {
  JSON.stringify(before) === JSON.stringify(after)
    ? console.log(true)
    : console.log(before, after);
}
test(Before(voyage, history), After(voyage, history));
//testByStringify()
