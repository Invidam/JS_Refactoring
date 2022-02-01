import {  as Before } from "./-before.js";
import {  as After } from "./-after.js";

function test(before,after) {
  before === after
    ? console.log(true)
    : console.log(before, after);
}

function testByStringify(before, after) {
  JSON.stringify(before) === JSON.stringify(after)
    ? console.log(true)
    : console.log(before, after);
}
test();
//testByStringify()