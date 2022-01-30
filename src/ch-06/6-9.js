const assert = require("assert");

function acquireReading() {
  return {
    month: 12,
    year: 2021,
    quantity: 500,
    customer: "Invidam",
  };
}
function baseRate(month, year) {
  return 0.2;
}
function taxThreshold(year) {
  return 150;
}
function calcBaseChare(aReading) {
  return baseRate(aReading.month, aReading.year) * aReading.quantity;
}
let result1 = "";
(function () {
  const aReading = acquireReading();
  const baseCharge =
    baseRate(aReading.month, aReading.year) * aReading.quantity;

  result1 += "C1, base: " + baseCharge + "\n";
})();
(function () {
  const aReading = acquireReading();
  const base = baseRate(aReading.month, aReading.year) * aReading.quantity;
  const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));
  result1 += "C2, base: " + base + " tax:" + taxableCharge + "\n";
})();
(function () {
  const aReading = acquireReading();
  const baseCharge = calcBaseChare(aReading);

  result1 += "C3, base: " + baseCharge + "\n";
})();

class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }

  get customer() {
    return this._customer;
  }

  get quantity() {
    return this._quantity;
  }

  get month() {
    return this._month;
  }

  get year() {
    return this._year;
  }
  get baseCharge() {
    return baseRate(this.month, this.year) * this.quantity;
  }
  get taxableCharge() {
    return Math.max(0, this.baseCharge - taxThreshold(this.year));
  }
}
let result2 = "";
(function () {
  const aReading = new Reading(acquireReading());
  const baseCharge = aReading.baseCharge;

  result2 += "C1, base: " + baseCharge + "\n";
})();
(function () {
  const aReading = new Reading(acquireReading());
  const baseCharge = aReading.baseCharge;
  const taxableCharge = aReading.taxableCharge;
  result2 += "C2, base: " + baseCharge + " tax:" + taxableCharge + "\n";
})();
(function () {
  const aReading = new Reading(acquireReading());
  const baseCharge = aReading.baseCharge;

  result2 += "C3, base: " + baseCharge + "\n";
})();

function test() {
  assert.equal(result2, result1, "Check Reading Data.");
}
test();
