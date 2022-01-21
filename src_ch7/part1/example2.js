// import { cloneDeep } from "lodash";
import _ from "lodash";
import customerData from "./mock/data.js";

class CustomerData {
  constructor(data) {
    this._data = data;
  }
  setUsage(customerID, year, month, amount) {
    this._data[customerID].usages[year][month] = amount;
  }
  get rawData() {
    return _.cloneDeep(this._data);
  }
  usage(customerID, year, month) {
    return this._data[customerID].usages[year][month];
  }
}

let customer = new CustomerData(customerData);

test(compareUsage(1920, 2016, 2), compareUsage2(1920, 2016, 2));

function compareUsage(customerID, lastYear, month) {
  customerData[customerID].usages[lastYear][month] = 300;
  const later = customerData[customerID].usages[lastYear][month];
  const earlier = customerData[customerID].usages[lastYear - 1][month];
  return { lastAmount: later, change: later - earlier };
}

function compareUsage2(customerID, lastYear, month) {
  getCustomerData().setUsage(customerID, lastYear, month, 300);
  const later = getCustomerData().usage(customerID, lastYear, month);
  const earlier = getCustomerData().usage(customerID, lastYear - 1, month);
  return { lastAmount: later, change: later - earlier };
}
function getCustomerData() {
  return customer;
}
function getRawDataOfCustomerData() {
  return customer._data;
}
function setRawDataOfCustomerData(arg) {
  customer = new CustomerData(arg);
}

function test(result1, result2) {
  if (JSON.stringify(result1) !== JSON.stringify(result2)) {
    console.log("❌❌❌❌❌❌❌❌", result1, result2);
  } else {
    console.log("✅✅✅✅✅✅✅✅✅✅✅✅");
  }
}
