export function after() {
  const {
    base: baseCharge,
    unit: chargePerUnit,
    discountFactor,
    discountThreshold,
  } = retrievePricingPlan();
  const order = retrieveOrder();
  const units = order.units;
  let charge = baseCharge + units * chargePerUnit;
  const discount = discountFor(order);
  charge = charge - discount;
  return chargeOrder(charge);

  function discountFor(order) {
    let discountableUnits = Math.max(order.units - discountThreshold, 0);
    let discount = discountableUnits * discountFactor;
    if (order.isRepeat) {
      discount += 20;
    }
    return discount;
  }

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

after();
