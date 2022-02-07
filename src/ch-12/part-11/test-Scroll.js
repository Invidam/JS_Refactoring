import { makeScroll as Before } from "./before-Scroll.js";
import { makeScroll as After } from "./after-Scroll.js";

function test(before, after) {
  before === after
    ? console.log(true)
    : console.log(`${before}
${after}`);
}
// prettier-ignore
function testByStringify(before, after) {
  JSON.stringify(before) === JSON.stringify(after) 
    ? console.log(true):console.log(`${JSON.stringify(before, 0, "  ")}
${JSON.stringify(after, 0, "  ")}`);
}
// test(Before(), After());
//testByStringify(Before(),After());

const lastCleaned = {
  date: new Date("2022-01-03"),
  until: function (targetDate, DAYS) {
    return (targetDate - this.date) / DAYS;
  },
};
const catalogDB = new Map([
  [
    4312,
    {
      title: "내전기",
      tags: ["war", "kaiser", "roma", "revered"],
    },
  ],
  [54874, { title: "Invidam autobiography", tags: ["IT", "autobiography"] }],
]);
const before1 = Before({
  id: 4312,
  title: "내전기",
  tags: ["war", "kaiser", "roma", "revered"],
  dataLastCleaned: lastCleaned,
});
const before2 = Before({
  id: 54874,
  title: "Invidam autobiography",
  tags: ["IT", "autobiography"],
  dataLastCleaned: lastCleaned,
});
const after1 = After({
  id: 431200001,
  catalogID: 4312,
  dataLastCleaned: lastCleaned,
  catalog: catalogDB,
});
const after2 = After({
  id: 5487400001,
  catalogID: 54874,
  dataLastCleaned: lastCleaned,
  catalog: catalogDB,
});

// testByStringify(before1, after1);
testByStringify(
  before1.needsCleaning(new Date("2025-01-01")),
  after1.needsCleaning(new Date("2025-01-01"))
);
// testByStringify(before2, after2);
testByStringify(
  before2.needsCleaning(new Date("2025-01-01")),
  after2.needsCleaning(new Date("2025-01-01"))
);
console.log(after1);
// console.log(scroll1.needsCleaning(new Date("2025-01-01")));
console.log(after2);
// console.log(scroll2.needsCleaning(new Date("2025-01-01")));
