import { result as Before } from "./before-Bird.js";
import { result as After } from "./after-Bird.js";

function test(before, after) {
  before === after
    ? console.log(true)
    : console.log(`${before}
${after}`);
}
// prettier-ignore
function testByStringify(before, after) {
  JSON.stringify(before) === JSON.stringify(after)
    ? console.log(true):console.log(`${JSON.stringify(before,0,"  ")}
${JSON.stringify(after,0,"  ")}`);
}
testByStringify(Before(), After());
//testByStringify(Before(),After());
