const assert = require("assert");

const orderString = "로마인이야기-8935610240 3";
const priceList = { 8935610240: 12000 };

//리팩터링 이전
const orderData = orderString.split(/\s+/);

const productPrice = priceList[orderData[0].split("-")[1]];

const orderPrice = parseInt(orderData[1]) * productPrice;

//리팩터링 이후
function parseOrder(orderString) {
  const [productInfo, quantityStr] = orderString.split(/\s+/);
  return {
    productID: productInfo.split("-")[1],
    quantity: parseInt(quantityStr),
  };
}
function price(order, priceList) {
  return order.quantity * priceList[order.productID];
}
const orderPrice2 = price(parseOrder(orderString), priceList);
assert.equal(orderPrice, orderPrice2, "Check orderPrice");
