const assert = require("assert");
const cloneDeep = require("lodash.clonedeep");

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

function enrichReading(argReading) {
  const aReading = cloneDeep(argReading);
  aReading.baseCharge = baseChare(aReading);
  aReading.taxableCharge = taxableCharge(aReading);

  return aReading;
  function baseChare(aReading) {
    return baseRate(aReading.month, aReading.year) * aReading.quantity;
  }
  function taxableCharge(aReading) {
    return Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));
  }
}
let result2 = "";
(function () {
  const aReading = enrichReading(acquireReading());
  const baseCharge = aReading.baseCharge;

  result2 += "C1, base: " + baseCharge + "\n";
})();
(function () {
  const aReading = enrichReading(acquireReading());
  const baseCharge = aReading.baseCharge;
  const taxableCharge = aReading.taxableCharge;
  result2 += "C2, base: " + baseCharge + " tax:" + taxableCharge + "\n";
})();
(function () {
  const aReading = enrichReading(acquireReading());
  const baseCharge = aReading.baseCharge;

  result2 += "C3, base: " + baseCharge + "\n";
})();

function test() {
  assert.equal(result2, result1, "Check Reading Data.");
}
test();

describe("clone deep test", function () {
  it("check reading unchanged", function () {
    const baseReading = acquireReading();
    const oracle = cloneDeep(baseReading);
    enrichReading(baseReading);
    assert.deepEqual(baseReading, oracle);
  });
});
