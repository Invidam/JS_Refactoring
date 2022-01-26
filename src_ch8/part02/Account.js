class Account {
  constructor(number, type) {
    this._number = number;
    this._type = type;
  }

  get interestRate() {
    return this._type.interestRate;
  }
  get info() {
    return this.toString();
  }
  toString() {
    return `\n---Account---\nNumber: ${this._number}\nType: ${this._type.info}\n`;
  }
}
class AccountType {
  constructor(nameString, interestRate) {
    this._nameString = nameString;
    this._interestRate = interestRate;
  }
  get interestRate() {
    return this._interestRate;
  }
  get info() {
    return this.toString();
  }
  toString() {
    return `${this._nameString} (${this.interestRate})`;
  }
}

const account = new Account(15, new AccountType("예금", 0.3));
console.log(account, account.info);
