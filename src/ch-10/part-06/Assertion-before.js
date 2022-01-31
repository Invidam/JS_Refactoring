function applyDiscount(aNumber, discountRate) {
  return discountRate ? aNumber - discountRate * aNumber : aNumber;
}

console.log(applyDiscount(300, 0.2));

console.log(applyDiscount(60, 0));
console.log(applyDiscount(1000, -3.5));
