import { numberOfMales as Before } from "./before-Person.js";
import { numberOfMales as After } from "./after-Person.js";

function test(before, after) {
  before === after
    ? console.log(true)
    : console.log(`${before}
${after}`);
}
// prettier-ignore
function testByStringify(before, after) {
  JSON.stringify(before) === JSON.stringify(after)
    ? console.log(true):console.log(`${before}
${after}`);
}

test(Before(), After());
//testByStringify(Before(),After());
