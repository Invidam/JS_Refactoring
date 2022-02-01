class HeatingPlan {
  constructor() {
    this._temperatureRange = { low: 18, high: 22 };
  }
  withinRange(bottom, top) {
    return (
      bottom >= this._temperatureRange.low && top <= this._temperatureRange.high
    );
  }
}

export function checkRangeOf(aRoom) {
  const aPlan = new HeatingPlan();
  const low = aRoom.daysTempRange.low;
  const high = aRoom.daysTempRange.high;
  if (!aPlan.withinRange(low, high)) {
    return "방 온도가 지정 범위를 벗어났습니다.";
  } else return "정상입니다.";
}
