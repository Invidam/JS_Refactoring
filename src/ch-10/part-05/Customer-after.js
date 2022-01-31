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
  get isUnknown() {
    return false;
  }
}
class UnknownCustomer {
  get isUnknown() {
    return true;
  }
  get name() {
    return "거주자";
  }
  get billingPlan() {
    return "새 플랜";
  }
  set billingPlan() {}
  get paymentHistory() {
    return "존재하지 않음";
  }
}
export class Site {
  constructor(customer = "미확인 고객") {
    this._customer = isUnknown(customer)
      ? new UnknownCustomer()
      : new Customer(customer);
  }
  get customer() {
    return this._customer;
  }
}

function isUnknown(arg) {
  if (!arg instanceof Customer && !arg instanceof UnknownCustomer)
    throw new TypeError("잘못된 값 입력");
  return arg === "미확인 고객";
}
