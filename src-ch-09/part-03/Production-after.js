import assert from "assert";

export class ProductionPlan {
  constructor(production) {
    this._initialProduction = production;
    this._adjustments = [];
  }

  get production() {
    return this._initialProduction + this.productionAccumulator;
  }
  get productionAccumulator() {
    return this._adjustments.reduce(
      (sum, adjustment) => (sum += adjustment.amount),
      0
    );
  }
  applyAdjustment(anAdjustment) {
    this._adjustments.push(anAdjustment);
  }
}
