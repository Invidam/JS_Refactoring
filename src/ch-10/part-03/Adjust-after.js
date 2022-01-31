export function adjustedCapital(anInstrument) {
  if (isNotEligibleForAdjust()) return 0;

  return (
    (anInstrument.income / anInstrument.duration) *
    anInstrument.adjustmentFactor
  );

  function isNotEligibleForAdjust() {
    return (
      anInstrument.capital <= 0 ||
      anInstrument.interestRate <= 0 ||
      anInstrument.duration <= 0
    );
  }
}
