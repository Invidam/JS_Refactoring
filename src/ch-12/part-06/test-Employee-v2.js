import { result as Before } from "./before-Employee-v2.js";
import { result as After } from "./after-Employee-v2.js";
// prettier-ignore
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
