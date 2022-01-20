const assert = require("assert");

const product = {
  basePrice: 20000,
  discountThreshold: 5,
  discountRate: 0.1,
};

const shippingMethod = {
  discountThreshold: 50000,
  discountedFee: 2000,
  feePerCase: 3000,
};
const result1 = priceOrder(product, 10, shippingMethod);

function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount =
    Math.max(quantity - product.discountThreshold, 0) *
    product.basePrice *
    product.discountRate;
  const shippingPerCase =
    basePrice > shippingMethod.discountThreshold
      ? shippingMethod.discountedFee
      : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = basePrice - discount + shippingCost; // 20 - 1  + 2

  return price;
}

const result2 = priceOrder2(product, 10, shippingMethod);

function priceOrder2(product, quantity, shippingMethod) {
  const priceData = calculatePriceData(product, quantity);

  return applyShipping(priceData, shippingMethod);

  function calculatePriceData(product, quantity) {
    const basePrice = product.basePrice * quantity;
    const discount =
      Math.max(quantity - product.discountThreshold, 0) *
      product.basePrice *
      product.discountRate;
    const priceData = { basePrice, quantity, discount };
    return priceData;
  }

  function applyShipping(priceData, shippingMethod) {
    const shippingPerCase =
      priceData.basePrice > shippingMethod.discountThreshold
        ? shippingMethod.discountedFee
        : shippingMethod.feePerCase;
    const shippingCost = priceData.quantity * shippingPerCase;
    const price = priceData.basePrice - priceData.discount + shippingCost;
    return price;
  }
}

assert.equal(result1, result2, "Check price order");
