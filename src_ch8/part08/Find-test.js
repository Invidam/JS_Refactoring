import data from "./data.js";
import * as before from "./Find-before.js";
import * as after from "./Find-after.js";

function test() {
  JSON.stringify(before.acquireData(data)) ===
  JSON.stringify(after.acquireData(data))
    ? console.log("C1", true)
    : console.log(
        "C1",
        JSON.stringify(before.acquireData(data)),
        JSON.stringify(after.acquireData(data))
      );
}

test();
