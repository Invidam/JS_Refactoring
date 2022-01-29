import { Order as After } from "./Order-after.js";
import { Order as Before } from "./Order-before.js";
import data from "./mock/data.js";

function test() {
  const after = new After(data);
  const before = new Before(data);
  const afterJson = JSON.stringify(after);
  const beforeJson = JSON.stringify(before);
  console.log(afterJson === beforeJson ? true : (afterJson, beforeJson));
}

test();
