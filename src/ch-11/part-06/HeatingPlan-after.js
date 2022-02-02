class HeatingPlan {
  constructor() {
    this._max = 22;
    this._min = 18;
  }
  targetTemperature(selectedTemperature) {
    let result;
    if (selectedTemperature > this._max) {
      result = this._max;
    } else if (selectedTemperature < this._min) {
      result = this._min;
    } else {
      result = selectedTemperature;
    }
    return result;
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
    if (
      thePlan.targetTemperature(thermostat.selectedTemperature) >
      thermostat.currentTemperature
    ) {
      setToHeat();
    } else if (
      thePlan.targetTemperature(thermostat.selectedTemperature) <
      thermostat.currentTemperature
    ) {
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
