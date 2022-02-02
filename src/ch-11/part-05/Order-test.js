import { priceFor as Before } from "./Order-before.js";
import { priceFor as After } from "./Order-after.js";

function test(before, after) {
  before === after ? console.log(true) : console.log(before, after);
}

function testByStringify(before, after) {
  JSON.stringify(before) === JSON.stringify(after)
    ? console.log(true)
    : console.log(before, after);
}

const data = { quantity: 20, itemPrice: 3000 };

test(Before(data), After(data));
//testByStringify()
