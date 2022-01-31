function createBird(bird) {
  switch (bird.type) {
    case "유럽 제비":
      return new EuropeanSwallow(bird);
    case "아프리카 제비":
      return new AfricanSwallow(bird);
    case "노르웨이 파랑 앵무":
      return new NorwegianBlueParrot(bird);
    default:
      return "알 수 없다";
  }
}

class Bird {
  constructor(birdDataObj) {
    Object.assign(this, birdDataObj);
  }
  get plumage() {
    return "알 수 없다";
  }
  get airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallow extends Bird {
  get plumage() {
    return "보통이다";
  }
  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallow extends Bird {
  get plumage() {
    return this.numberOfCoconuts > 2 ? "지쳤다" : "보통이다";
  }
  get airSpeedVelocity() {
    return 40 - 2 * this.numberOfCoconuts;
  }
}

class NorwegianBlueParrot extends Bird {
  get plumage() {
    return this.voltage > 100 ? "그을렸다" : "예쁘다";
  }
  get airSpeedVelocity() {
    return this.isNailed ? 0 : 10 + this.voltage / 10;
  }
}

export function plumages(birds) {
  return new Map(birds.map(createBird).map((b) => [b.name, b.plumage]));
}

export function speeds(birds) {
  return new Map(
    birds.map(createBird).map((b) => [b.name, b.airSpeedVelocity])
  );
}
