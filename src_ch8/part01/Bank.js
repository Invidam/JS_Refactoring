class AccountType {
  constructor(isPremium) {
    this.isPremium = isPremium;
  }
  overdraftCharge(account) {
    if (this.isPremium) {
      const baseCharge = 10;

      if (account.daysOverdrawn <= 7) {
        return baseCharge;
      } else {
        return baseCharge + (account.daysOverdrawn - 7) * 0.85;
      }
    } else {
      return account.daysOverdrawn * 1.75;
    }
  }
}
class Account {
  // 은행 이자 계산
  constructor(data) {
    ({
      //   overdraftCharge: this.overdraftCharge,
      daysOverdrawn: this.daysOverdrawn,
      type: this.type,
    } = data);
  }
  get bankCharge() {
    let result = 4.5;

    if (this.daysOverdrawn > 0) {
      result += this.overdraftCharge;
    }

    return result;
  }

  // 초과 인출 이자 계산
  get overdraftCharge() {
    return this.type.overdraftCharge(this);
  }
}
const accountType = new AccountType(false);
const data = {
  daysOverdrawn: 3,
  type: accountType,
};

const account = new Account(data);
console.log(account.bankCharge);
// console.log(accountType.overdraftCharge(30));
