import { chargeFor as After } from "./Plan-after.js";
import { chargeFor as Before } from "./Plan-before.js";
class DateObj {
  constructor(date) {
    this._date = date;
  }
  get date() {
    return this._date;
  }
  isBefore(other) {
    return this.date.getTime() < other.getTime();
  }
  isAfter(other) {
    return this.date.getTime() > other.getTime();
  }
}

const plan = {
  summerStart: new Date("2022 / 6 / 21"),
  summerEnd: new Date("2022 / 9 / 23"),
  summerRate: 70,
  regularRate: 30,
  regularServiceCharge: 200,
};

const date1 = new DateObj(new Date());
const date2 = new DateObj(new Date("2022 / 8 / 1"));

function test() {
  let before = { plan1: Before(plan, date1), plan2: Before(plan, date2) };
  let after = { plan1: After(plan, date1), plan2: After(plan, date2) };
  JSON.stringify(before) === JSON.stringify(after)
    ? console.log(true)
    : console.log(before, after);
}

test();
