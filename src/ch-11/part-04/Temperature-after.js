class HeatingPlan {
  constructor() {
    this._temperatureRange = { low: 18, high: 22 };
  }
  withinRange(range) {
    return (
      range.low >= this._temperatureRange.low &&
      range.high <= this._temperatureRange.high
    );
  }
}

export function checkRangeOf(aRoom) {
  const aPlan = new HeatingPlan();
  const tempRange = aRoom.daysTempRange;
  if (!aPlan.withinRange(tempRange)) {
    return "방 온도가 지정 범위를 벗어났습니다.";
  } else return "정상입니다.";
}
