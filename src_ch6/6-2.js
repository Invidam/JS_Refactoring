function rating(aDriver) {
  return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(aDriver) {
  return aDriver.numberOfLaterDeliveries > 5;
}

function rating(aDriver) {
  return aDriver.numberOfLaterDeliveries > 5 ? 2 : 1;
}

const driver = { numberOfLaterDeliveries: 3 };

console.log(rating(driver));
