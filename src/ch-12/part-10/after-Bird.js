function createBird(bird) {
  return new Bird(bird);
}
class Bird {
  constructor(data) {
    this._name = data.name;
    this._plumage = data.plumage;
    this._speciesDelegate = this.selectSpeciesDelegate(data);
  }

  get name() {
    return this._name;
  }

  get plumage() {
    return this._speciesDelegate.plumage;
  }

  get airSpeedVelocity() {
    return this._speciesDelegate.airSpeedVelocity;
  }
  selectSpeciesDelegate(data) {
    switch (data.type) {
      case "유럽 제비":
        return new EuropeanSwallowDelegate(data, this);
      case "아프리카 제비":
        return new AfricanSwallowDelegate(data, this);
      case "노르웨이 파랑 앵무":
        return new NorwegianBlueParrotDelegate(data, this);
      default:
        return new SpeciesDelegate(data, this);
    }
  }
}
class SpeciesDelegate {
  constructor(data, bird) {
    this._bird = bird;
  }
  get plumage() {
    return this._bird._plumage || "보통이다";
  }
  get airSpeedVelocity() {
    return null;
  }
}
class EuropeanSwallowDelegate extends SpeciesDelegate {
  constructor(data, bird) {
    super(data, bird);
  }
  get airSpeedVelocity() {
    return 35;
  }
}
class AfricanSwallowDelegate extends SpeciesDelegate {
  constructor(data, bird) {
    super(data, bird);
    this._numberOfCoconuts = data.numberOfCoconuts;
  }
  get airSpeedVelocity() {
    return 40 - 2 * this._numberOfCoconuts;
  }
}
class NorwegianBlueParrotDelegate extends SpeciesDelegate {
  constructor(data, bird) {
    super(data, bird);
    this._bird = bird;
    this._voltage = data.voltage;
    this._isNailed = data.isNailed;
  }
  get plumage() {
    if (this._voltage > 100) {
      return "그을렸다";
    } else {
      return this._bird._plumage || "예쁘다";
    }
  }

  get airSpeedVelocity() {
    return this._isNailed ? 0 : 10 + this._voltage / 10;
  }
}

const birds = [
  {
    name: "1",
    type: "유럽 제비",
    numberOfCoconuts: 0,
    isNailed: false,
    voltage: 0,
    plumage: "모르겠다.",
  },
  {
    name: "2",
    type: "유럽 제비",
    numberOfCoconuts: 3,
    isNailed: false,
    voltage: 0,
    plumage: "모르겠다.",
  },
  {
    name: "3",
    type: "아프리카 제비",
    numberOfCoconuts: 4,
    isNailed: false,
    voltage: 0,
    plumage: "모르겠다.",
  },
  {
    name: "4",
    type: "아프리카 제비",
    numberOfCoconuts: 1,
    isNailed: false,
    voltage: 0,
    plumage: "모르겠다.",
  },
  {
    name: "5",
    type: "노르웨이 파랑 앵무",
    numberOfCoconuts: 0,
    isNailed: true,
    voltage: 4000000,
    plumage: "모르겠다.",
  },
  {
    name: "6",
    type: "노르웨이 파랑 앵무",
    numberOfCoconuts: 0,
    isNailed: false,
    voltage: 50,
    plumage: "모르겠다.",
  },
];
export function result() {
  return birds.map(createBird);
}

console.log(createBird(birds[4]).plumage);
