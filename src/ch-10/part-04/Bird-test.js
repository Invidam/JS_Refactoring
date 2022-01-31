import { plumages as before1, speeds as before2 } from "./Bird-before.js";

import { plumages as after1, speeds as after2 } from "./Bird-after.js";

function test(before, after) {
  before === after ? console.log(true) : console.log(before, after);
}

function testByStringify(before, after) {
  JSON.stringify([...before]) === JSON.stringify([...after])
    ? console.log(true)
    : console.log([...before], [...after]);
}
// test();
//testByStringify()
const birds = [
  {
    name: "1",
    type: "유럽 제비",
    numberOfCoconuts: 0,
    isNailed: false,
    voltage: 0,
  },
  {
    name: "2",
    type: "유럽 제비",
    numberOfCoconuts: 3,
    isNailed: false,
    voltage: 0,
  },
  {
    name: "3",
    type: "아프리카 제비",
    numberOfCoconuts: 4,
    isNailed: false,
    voltage: 0,
  },
  {
    name: "4",
    type: "아프리카 제비",
    numberOfCoconuts: 1,
    isNailed: false,
    voltage: 0,
  },
  {
    name: "5",
    type: "노르웨이 파랑 앵무",
    numberOfCoconuts: 0,
    isNailed: true,
    voltage: 4000000,
  },
  {
    name: "6",
    type: "노르웨이 파랑 앵무",
    numberOfCoconuts: 0,
    isNailed: false,
    voltage: 50,
  },
];

testByStringify(before1(birds), after1(birds));
testByStringify(before2(birds), after2(birds));
