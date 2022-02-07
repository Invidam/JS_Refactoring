class Booking {
  constructor(show, date) {
    this._show = show;
    this._date = date;
  }

  get hasTalkback() {
    return this._show.hasOwnProperty("talkback") && !this.isPeakDay;
  }

  get basePrice() {
    let result = this._show.price;

    if (this.isPeakDay) {
      result += Math.round(result * 0.15);
    }

    return result;
  }
}

class PremiumBooking extends Booking {
  constructor(show, date, extras) {
    super(show, date);

    this._extras = extras;
  }

  get hasTalkback() {
    return this._show.hasOwnProperty("talkback");
  }

  get basePrice() {
    return Math.round(super.basePrice + this._extras.PremiumFee);
  }

  get hasDinner() {
    return this._extras.hasOwnProperty("dinner") && !this.isPeakDay;
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
const aBooking = new Booking(show, date);
const aPremiumBooking = new PremiumBooking(show, date, extras);

export function result() {
  return toString(aBooking) + toString(aPremiumBooking);
  function toString(aClass) {
    return JSON.stringify(aClass, 0, "  ");
  }
}
