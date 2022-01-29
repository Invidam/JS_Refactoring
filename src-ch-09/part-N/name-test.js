import {  as After } from "./-after.js";
import {  as Before } from "./-before.js";

function test() {
  before() === After()
    ? console.log(true)
    : console.log(before(), After());
}

test();
