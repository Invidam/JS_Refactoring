import { after } from "./Order-after.js";
import { before } from "./Order-before.js";

function test() {
  before() === after() ? console.log(true) : console.log(before(), after());
}

test();
