import * as before from "./Resource-before.js";
import * as after from "./Resource-after.js";

function test() {
  JSON.stringify(before.case1()) === JSON.stringify(after.case1())
    ? console.log("C1", true)
    : console.log(
        "C1",
        JSON.stringify(before.case1()),
        JSON.stringify(after.case1())
      );
  JSON.stringify(before.case2()) === JSON.stringify(after.case2())
    ? console.log("C2", true)
    : console.log(
        "C2",
        JSON.stringify(before.case2()),
        JSON.stringify(after.case2())
      );
}

test();
