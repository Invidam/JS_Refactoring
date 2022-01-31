export function disabilityAmount(anEmployee) {
  if (isNotEligibleForDisability()) {
    return 0;
  }
  const disabilityAmountRate = 0.2;
  return anEmployee.salary * disabilityAmountRate;

  function isNotEligibleForDisability() {
    return (
      anEmployee.seniority < 2 ||
      anEmployee.monthDisabled > 12 ||
      anEmployee.isPartTime
    );
  }
}
