class HeatingPlan {
  constructor() {
    this._max = 22;
    this._min = 18;
  }
  get targetTemperature() {
    if (thermostat.selectedTemperature > this._max) {
      return this._max;
    } else if (thermostat.selectedTemperature < this._min) {
      return this._min;
    } else {
      return thermostat.selectedTemperature;
    }
  }
}

const thermostat = {
  currentTemperature: 20,
  selectedTemperature: 24,
  isWork: true,
};
export function set() {
  const settingRecord = [];
  const thePlan = new HeatingPlan();
  while (thermostat.isWork) {
    if (thePlan.targetTemperature > thermostat.currentTemperature) {
      setToHeat();
    } else if (thePlan.targetTemperature < thermostat.currentTemperature) {
      setToCool();
    } else {
      setOff();
    }
  }
  function setToHeat() {
    thermostat.currentTemperature++;
    settingRecord.push(1);
  }
  function setToCool() {
    thermostat.currentTemperature--;
    settingRecord.push(-1);
  }
  function setOff() {
    thermostat.isWork = false;
    settingRecord.push(0);
  }
  return settingRecord;
}
