class CustomerContract {
  constructor(startDate, discountRate) {
    this._startDate = startDate;
  }
  set discountRate(arg) {
    this._discountRate = arg;
  }
  get discountRate() {
    return this._discountRate;
  }
}

function dateToday() {
  return new Date();
}

class Customer {
  constructor(name, discountRate) {
    this._name = name;
    this._contract = new CustomerContract(dateToday());
    this._setDiscountRate(discountRate);
  }
  _setDiscountRate(arg) {
    this._contract.discountRate = arg;
  }
  get discountRate() {
    return this._contract.discountRate;
  }

  becomePreferred() {
    this._setDiscountRate((this._contract.discountRate += 0.03));

    // some code
  }

  applyDiscount(amount) {
    return amount.subtract(amount.multiply(this._contract.discountRate));
  }
}

const customer = new Customer("Invidam", 0.15);
customer.becomePreferred();
console.log(customer.discountRate);
