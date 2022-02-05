import { result as Before } from "./before-Employee.js";
import { result as After } from "./after-Employee.js";

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
