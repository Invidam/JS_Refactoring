import { deliveryDate as Before } from "./DeliveryDate-before.js";
import { rushDeliveryDate, regularDeliveryDate } from "./DeliveryDate-after.js";

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
    return result;
  }
}
const orders = [
  { deliveryState: "CT", placedOn: new DateObj(new Date("2022-01-31")) },
  { deliveryState: "NY", placedOn: new DateObj(new Date("2021-12-4")) },
  { deliveryState: "KR", placedOn: new DateObj(new Date()) },
];

function check1(fun) {
  let result = "";
  orders.forEach((order) => (result += fun(order, true) + fun(order, false)));
  return result;
}
function check2() {
  let result = "";
  orders.forEach(
    (order) =>
      (result +=
        rushDeliveryDate(order, true) + regularDeliveryDate(order, false))
  );
  return result;
}
test(check1(Before), check2());
//testByStringify()
