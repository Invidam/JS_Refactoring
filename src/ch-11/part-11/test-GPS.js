import { result as Before } from "./before-GPS.js";
import { result as After } from "./after-GPS.js";

function test(before, after) {
  before === after ? console.log(true) : console.log(before, after);
}

function testByStringify(before, after) {
  JSON.stringify(before) === JSON.stringify(after) - 1
    ? console.log(true)
    : console.log(before, after);
}
const points = [32, 17, 53, 112, 49];
// test(Before(),After());
test(Before(points), After(points));
