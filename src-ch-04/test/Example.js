import DOCUMENT from "./mock/document.js";
import { assert, expect } from "chai";

function sampleProvinceData() {
  return DOCUMENT;
}
class Province {
  constructor(doc) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach((data) => this.addProducer(new Producer(this, data)));
  }
  addProducer(producer) {
    this._producers.push(producer);
    this._totalProduction += producer.production;
  }

  get name() {
    return this._name;
  }

  get producers() {
    return this._producers.slice();
  }

  get totalProduction() {
    return this._totalProduction;
  }

  set totalProduction(arg) {
    this._totalProduction = arg;
  }

  get demand() {
    return this._demand;
  }

  set demand(arg) {
    this._demand = parseInt(arg);
  }

  get price() {
    return this._price;
  }

  set price(arg) {
    this._price = parseInt(arg);
  }
  get shortfall() {
    return this._demand - this.totalProduction;
  }
  get profit() {
    return this.demandValue - this.demandCost;
  }
  get demandValue() {
    return this.satisfiedDemand * this.price;
  }
  get satisfiedDemand() {
    return Math.min(this._demand, this._totalProduction) < 0
      ? 0
      : Math.min(this._demand, this._totalProduction);
  }
  get demandCost() {
    let result = 0;
    let remainingDemand = this.demand;
    this.producers
      .sort((a, b) => a.cost - b.cost)
      .forEach((laneProducer) => {
        let contribution = Math.min(remainingDemand, laneProducer.production);
        if (contribution < 0) return result;
        remainingDemand -= contribution;
        result += contribution * laneProducer.cost;
      });
    return result;
  }
}

class Producer {
  constructor(aProvince, data) {
    this._province = aProvince;
    this._cost = data.cost;
    this._name = data.name;
    this._production = data.production | 0;
  }
  get name() {
    return this._name;
  }

  get cost() {
    return this._cost;
  }

  set cost(arg) {
    this._cost = parseInt(arg);
  }

  get production() {
    return this._production;
  }

  set production(amountStr) {
    const amount = parseInt(amountStr);
    const newProduction = Number.isNaN(amount) ? 0 : amount;

    this._province.totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
}

describe("province", function () {
  let korea;
  beforeEach(function () {
    korea = new Province(sampleProvinceData());
  });
  it("shortfall", function () {
    assert.equal(korea.shortfall, 5);
  });
  it("profit", function () {
    expect(korea.profit).equal(230);
  });
  it("change production", function () {
    korea.producers[0].production = 20;
    expect(korea.shortfall).equal(-6);
    expect(korea.profit).equal(292);
  });
});

describe("no producer", function () {
  let noProducers;
  beforeEach(function () {
    const data = {
      name: "No Producers",
      producers: [],
      demand: 30,
      price: 20,
    };

    noProducers = new Province(data);
  });

  it("shortfall", function () {
    assert.equal(noProducers.shortfall, 30);
  });
  it("profit", function () {
    expect(noProducers.profit).equal(0);
  });
});

describe("zero demand ", function () {
  let korea;
  beforeEach(function () {
    korea = new Province(sampleProvinceData());
    korea.demand = 0;
  });

  it("shortfall", function () {
    expect(korea.shortfall).equal(-25);
  });
  it("profit", function () {
    expect(korea.profit).equal(0);
  });
});
describe("negative demand ", function () {
  let korea;
  beforeEach(function () {
    korea = new Province(sampleProvinceData());
    korea.demand = -5;
  });

  it("shortfall", function () {
    expect(korea.shortfall).equal(-30);
  });
  it("profit", function () {
    expect(korea.profit).equal(0);
  });
});
describe("empty string demand ", function () {
  let korea;
  beforeEach(function () {
    korea = new Province(sampleProvinceData());
    korea.demand = "";
  });

  it("shortfall", function () {
    expect(korea.shortfall).NaN;
  });
  it("profit", function () {
    expect(korea.profit).NaN;
  });
});
