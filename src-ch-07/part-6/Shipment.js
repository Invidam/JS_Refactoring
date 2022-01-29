class Shipment {
  get trackingInfo() {
    return this.trackingInformation.display;
  }

  get trackingInformation() {
    return this._trackingInformation;
  }

  set trackingInformation(aTrackingInformation) {
    this._trackingInformation = aTrackingInformation;
  }
}
class TrackingInformation {
  get trackingNumber() {
    return this._trackingNumber;
  }

  set trackingNumber(arg) {
    this._trackingNumber = arg;
  }

  get display() {
    return this.toString();
  }
  toString() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
}

const data = {
  shippingCompany: "Amazon",
  trackingNumber: 2858,
};

const shipment = new Shipment();
shipment.trackingInformation = new TrackingInformation();

shipment.trackingInformation.shippingCompany = "Amazon";
shipment.trackingInformation.trackingNumber = 2858;

console.log(shipment.trackingInfo);
