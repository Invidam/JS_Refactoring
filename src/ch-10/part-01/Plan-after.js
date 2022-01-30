export function chargeFor(plan, aDate) {
  let quantity = 200;
  return summer() ? summerCharge() : regularCharge();

  let charge;
  if (summer()) {
    charge = summerCharge();
  } else {
    charge = regularCharge();
  }
  return charge;

  function regularCharge() {
    return quantity * plan.regularRate + plan.regularServiceCharge;
  }

  function summerCharge() {
    return quantity * plan.summerRate;
  }

  function summer() {
    return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
  }
}

export function result() {
  return { plan1: chargeFor(plan, date1), plan2: chargeFor(plan, date2) };
}
