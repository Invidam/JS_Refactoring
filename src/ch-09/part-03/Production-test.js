import { ProductionPlan as After } from "./Production-after.js";
import { ProductionPlan as Before } from "./Production-before.js";

const adjustments = [
  { amount: 30 },
  { amount: 120 },
  { amount: 60 },
  { amount: 5 },
  { amount: 25 },
];

function test() {
  const before = new Before(2000);
  adjustments.forEach((adjustment) => before.applyAdjustment(adjustment));

  const after = new After(2000);
  adjustments.forEach((adjustment) => after.applyAdjustment(adjustment));

  before.production === after.production
    ? console.log(true)
    : console.log(before.production, after.production);
}

test();
