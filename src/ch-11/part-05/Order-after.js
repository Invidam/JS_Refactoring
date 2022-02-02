class Order {
  constructor(data) {
    Object.assign(this, data);
  }
  get discountLevel() {
    let discountLevel;

    if (this.quantity > 100) {
      discountLevel = 2;
    } else {
      discountLevel = 1;
    }
    return discountLevel;
  }
  get basePrice() {
    return this.quantity * this.itemPrice;
  }
  get finalPrice() {
    return this.discountedPrice(this.basePrice);
  }

  discountedPrice() {
    switch (this.discountLevel) {
      case 1:
        return this.basePrice * 0.95;
      case 2:
        return this.basePrice * 0.9;
    }
  }
}

export const priceFor = (data) => {
  return new Order(data).finalPrice;
};
