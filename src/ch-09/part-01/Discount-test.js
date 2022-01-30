import { discount as after } from "./Discount-after.js";
import { discount as before } from "./Discount-before.js";

function test() {
  before(40, 120) === after(40, 120)
    ? console.log(true)
    : console.log(before(40, 120), after(40, 120));
}

test();
