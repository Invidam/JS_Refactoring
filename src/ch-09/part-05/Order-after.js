import data from "./mock/data.js";
let _repositoryData;

export function initialize() {
  _repositoryData = {};
  _repositoryData.customer = new Map();
}

export function registerCustomer(id) {
  if (!_repositoryData.customer.has(id)) {
    _repositoryData.customer.set(id, new Customer(id));
  }

  return findCustomer(id);
}

export function findCustomer(id) {
  return _repositoryData.customer.get(id);
}

class Customer {
  constructor(id) {
    this._id = id;
  }
  get id() {
    return this._id;
  }
}

export class Order {
  constructor(data) {
    initialize();
    this._number = data.number;
    this._customer = registerCustomer(data.customer);
  }

  get customer() {
    return this._customer;
  }
}
