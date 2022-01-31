import assert from "assert";

function applyDiscount(aNumber, discountRate) {
  if (!discountRate) return aNumber;
  else {
    assert(discountRate >= 0, "Discount Rate under than zero.");
    return aNumber - discountRate * aNumber;
  }
}

console.log(applyDiscount(300, 0.2));

console.log(applyDiscount(60, 0));
console.log(applyDiscount(1000, -3.5));
