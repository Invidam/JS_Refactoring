export function disabilityAmount(anEmployee) {
  if (anEmployee.seniority < 2) {
    return 0;
  }
  if (anEmployee.monthDisabled > 12) {
    return 0;
  }
  if (anEmployee.isPartTime) {
    return 0;
  }
  const disabilityAmountRate = 0.2;
  return anEmployee.salary * disabilityAmountRate;
}
