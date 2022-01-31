class Customer {
  constructor(data) {
    ({
      name: this._data,
      billingPlan: this._billingPlan,
      paymentHistory: this._paymentHistory,
    } = data);
  }
  get name() {
    return this._name;
  }

  get billingPlan() {
    return this._billingPlan;
  }

  set billingPlan(arg) {}

  get paymentHistory() {
    return this._paymentHistory;
  }
}

export class Site {
  constructor(customer = "미확인 고객") {
    this._customer =
      customer === "미확인 고객" ? "미확인 고객" : new Customer(customer);
  }
  get customer() {
    return this._customer;
  }
}
