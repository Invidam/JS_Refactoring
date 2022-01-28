export function before() {
  const pricingPlan = retrievePricingPlan();
  const order = retrieveOrder();
  const baseCharge = pricingPlan.base;
  let charge;
  const chargePerUnit = pricingPlan.unit;
  const units = order.units;
  let discount;
  charge = baseCharge + units * chargePerUnit;
  let discountableUnits = Math.max(units - pricingPlan.discountThreshold, 0);
  discount = discountableUnits * pricingPlan.discountFactor;
  if (order.isRepeat) {
    discount += 20;
  }
  charge = charge - discount;
  return chargeOrder(charge);

  function retrievePricingPlan() {
    return {
      base: 2300,
      unit: 100, // per minute
      discountThreshold: 15,
      discountFactor: 50,
    };
  }

  function retrieveOrder() {
    return {
      units: 20,
      isRepeat: false,
    };
  }

  function chargeOrder() {
    // console.log("Charge: ", charge);
    return charge;
  }
}

before();
