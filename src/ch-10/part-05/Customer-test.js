import { Site as Before } from "./Customer-before.js";
import { Site as After } from "./Customer-after.js";

function test(before, after) {
  before === after ? console.log(true) : console.log(before, after);
}

function testByStringify(before, after, str) {
  console.log("----------------------", str, "--------------------");
  JSON.stringify(before) === JSON.stringify(after)
    ? console.log(true)
    : console.log(before, after);
}
// test();

const data = {
  name: "Invidam",
  billingPlan: "알뜰폰",
  paymentHistory: "3300",
};

testByStringify(new Before(data), new After(data), "일반 고객");
testByStringify(
  new Before("미확인 고객"),
  new After("미확인 고객"),
  "미확인 고객"
);
