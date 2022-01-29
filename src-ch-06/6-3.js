function price(order) {
  return (
    order.quantity * order.itemPrice -
    Math.max(0, order.quantity - 500) * order.itemPrice * 0.05 +
    Math.min(order.quantity * order.itemPrice * 0.1, 0.05)
  );
}

function priceForTest(order) {
  const basePrice = order.quantity * order.itemPrice;
  const salePrice = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const deliverPrice = Math.min(order.quantity * order.itemPrice * 0.1, 0.05);
  return basePrice - salePrice + deliverPrice;
}

const order = {
  quantity: 50,
  itemPrice: 8,
};

console.log(price(order) === priceForTest(order));
