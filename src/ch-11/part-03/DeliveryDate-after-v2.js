export function deliveryDate(anOrder, isRush) {
  if (isRush) {
    return rushDeliveryDate(anOrder);
  } else {
    return regularDeliveryDate(anOrder);
  }
}

export function rushDeliveryDate(anOrder) {
  let isRush = true;
  let result;
  let deliveryTime;
  if (anOrder.deliveryState === "MA" || anOrder.deliveryState === "CT") {
    deliveryTime = 1;
  } else if (anOrder.deliveryState === "NY" || anOrder.deliveryState === "NH") {
    deliveryTime = 2;
  } else {
    deliveryTime = 3;
  }

  result = anOrder.placedOn.plusDays(1 + deliveryTime);

  return result;
}

export function regularDeliveryDate(anOrder) {
  let isRush = false;
  let result;
  let deliveryTime;

  if (anOrder.deliveryState === "MA" || anOrder.deliveryState === "CT") {
    deliveryTime = 2;
  } else if (anOrder.deliveryState === "NY") {
    deliveryTime = 2;
  } else if (anOrder.deliveryState === "NH" || anOrder.deliveryState === "ME") {
    deliveryTime = 3;
  } else {
    deliveryTime = 4;
  }

  result = anOrder.placedOn.plusDays(2 + deliveryTime);

  return result;
}
