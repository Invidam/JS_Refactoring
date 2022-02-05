class PremiumBookingDelegate {
  constructor(hostBooking, extras) {
    this._host = hostBooking;
    this._extras = extras;
  }
  get hasTalkback() {
    return this._host._show.hasOwnProperty("talkback");
  }
  basePrice(base) {
    return Math.round(base + this._extras.PremiumFee);
  }
  get hasDinner() {
    return this._extras.hasOwnProperty("dinner") && !this._host.isPeakDay;
  }
}

class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }

  get hasTalkback() {
    return this._premiumDelegate
      ? this._premiumDelegate.hasTalkback
      : this._show.hasOwnProperty("talkback") && !this.isPeakDay;
  }

  get basePrice() {
    let result = this._show.price;

    if (this.isPeakDay) {
      result += Math.round(result * 0.15);
    }
    return this._premiumDelegate
      ? this._premiumDelegate.basePrice(result)
      : result;
  }
  _bePremium() {
    this._premiumDelegate = new PremiumBookingDelegate(this, extras);
  }
}

const show = {
  basePrice: 80000,
  hasOwnProperty: function (aString) {
    return aString === "talkback";
  },
};
const extras = {
  PremiumFee: 50000,
  hasOwnProperty: function (aString) {
    return aString === "dinner";
  },
};
const date = new Date();
const aBooking = createBooking(show, date);
const aPremiumBooking = createPremiumBooking(show, date, extras);

function createBooking(show, date) {
  return new Booking(show, date);
}

function createPremiumBooking(show, date, extras) {
  const result = new Booking(show, date, extras);
  result._bePremium(extras);
  return result;
}

export function result() {
  return toString(aBooking) + toString(aPremiumBooking);
  function toString(aClass) {
    return JSON.stringify(aClass, 0, "  ");
  }
}
