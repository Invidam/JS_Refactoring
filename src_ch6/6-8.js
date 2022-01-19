const user = {
  name: "Invidam",
  visitedDate: [
    new Date("2021-12-15"),
    new Date("2021-12-27"),
    new Date("2022-01-17"),
    new Date("2022-01-18"),
    new Date("2022-06-06"),
    new Date("2023-11-18"),
  ],
};
const max = new Date("2022-12-31");
const min = new Date("2022-01-01");
function readingOutsideRange(user, min, max) {
  return user.visitedDate.filter((d) => d < min || d > max);
}
console.log(user.visitedDate);
console.log(readingOutsideRange(user, min, max));

const user = {
  name: "Invidam",
  visitedDate: [
    new Date("2021-12-15"),
    new Date("2021-12-27"),
    new Date("2022-01-17"),
    new Date("2022-01-18"),
    new Date("2022-06-06"),
    new Date("2023-11-18"),
  ],
};
class DateRange {
  constructor(min, max) {
    this._date = { min, max };
  }
  get min() {
    return this._date.min;
  }
  get max() {
    return this._date.max;
  }
  contains(date) {
    return date < this.min || date > this.max;
  }
}
const max = new Date("2022-12-31");
const min = new Date("2022-01-01");
const dateRange = new DateRange(min, max);
function readingOutsideRange(user, min, max) {
  return user.visitedDate.filter((d) => d < min || d > max);
}

function zz__readingOutsideRange(user, dateRange) {
  return user.visitedDate.filter((d) => dateRange.contains(d));
}
// console.log(user.visitedDate);

function test() {
  console.log(
    isEqualArray(
      readingOutsideRange(user, min, max),
      zz__readingOutsideRange(user, dateRange)
    )
      ? true
      : {
          act: readingOutsideRange(user, min, max),
          real: zz__readingOutsideRange(user, dateRange),
        }
  );
  function isEqualArray(arr1, arr2) {
    arr1.forEach((elem, idx) => {
      if (arr2[idx] !== arr1) return false;
    });
    return arr1.length === arr2.length;
  }
}
test();
