// class Book {
//   constructor() {
//     this._reservations = [];
//   }
//   addReservation(customer) {
//     this._reservations.push(customer);
//   }
//   get reservations() {
//     return this._reservations;
//   }
// }

// const book = new Book();
// book.addReservation("Invidam");
// book.addReservation("PHS");
// console.log(book.reservations);

// class Book {
//   constructor() {
//     this._reservations = [];
//   }
//   addReservation(customer) {
//     return this.zz_addReservation(customer);
//   }
//   zz_addReservation(customer) {
//     return this._reservations.push(customer);
//   }
//   get reservations() {
//     return this._reservations;
//   }
// }

// const book = new Book();
// book.addReservation("Invidam");
// book.addReservation("PHS");
// console.log(book.reservations);

class Book {
  constructor() {
    this._reservations = [];
  }
  addReservation(customer) {
    return this.zz_addReservation(customer);
  }
  zz_addReservation(customer, isPriority) {
    return this._reservations.push(customer);
  }
  get reservations() {
    return this._reservations;
  }
}
