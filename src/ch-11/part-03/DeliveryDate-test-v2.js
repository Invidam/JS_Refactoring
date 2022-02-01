import { deliveryDate as Before } from "./DeliveryDate-before-v2.js";
import {
  rushDeliveryDate,
  regularDeliveryDate,
} from "./DeliveryDate-after-v2.js";

function test(before, after) {
  before === after ? console.log(true) : console.log(before, after);
}

function testByStringify(before, after) {
  JSON.stringify(before) === JSON.stringify(after)
    ? console.log(true)
    : console.log(before, after);
}
class DateObj {
  constructor(date = new Date()) {
    this.date = date;
  }
  plusDays(dayNum) {
    let result = new Date(this.date);
    result.setDate(this.date.getDate() + dayNum);
    return new DateObj(result);
  }
  minusDays(dayNum) {
    let result = new Date(this.date);
    result.setDate(this.date.getDate() - dayNum);
    return new DateObj(result);
  }
  get info() {
    return this.date.toISOString();
  }
}
const orders = [
  { deliveryState: "CT", placedOn: new DateObj(new Date("2022-01-31")) },
  { deliveryState: "NY", placedOn: new DateObj(new Date("2021-12-4")) },
  { deliveryState: "KR", placedOn: new DateObj(new Date()) },
];

function check1(fun) {
  let result = [];
  orders.forEach((order) =>
    result.push([(fun(order, true).info, fun(order, false).info)])
  );
  return result;
}
function check2() {
  let result = [];
  orders.forEach((order) =>
    result.push([
      (rushDeliveryDate(order, true).info,
      regularDeliveryDate(order, false).info),
    ])
  );
  return result;
}
testByStringify(check1(Before), check2());
//testByStringify()
