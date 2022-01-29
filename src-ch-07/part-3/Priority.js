class Order {
  constructor(name, priority) {
    this._name = name;
    this._priority = new Priority(priority);
  }
  get name() {
    return this._name;
  }
  get priority() {
    return this._priority;
  }
  get priorityString() {
    return this._priority.toString();
  }
  set priority(aString) {
    this._priority = new Priority(aString);
  }
}
class Priority {
  constructor(value) {
    this._value = value;
  }
  toString() {
    return this._value.toString();
  }
  get _index() {
    return Priority.legalValues().findIndex(
      (priority) => priority === this._value
    );
  }
  get priorityValue() {
    return this._index;
  }
  static legalValues() {
    return ["low", "normal", "high", "rush"];
  }
  higherThan(other) {
    return this.priorityValue > other.priorityValue;
  }
  lowerThan(other) {
    return this.priorityValue < other.priorityValue;
  }
  equals(other) {
    return this.priorityValue === other.priorityValue;
  }
}
const orders = [
  new Order("pizza", "high"),
  new Order("hamburger", "low"),
  new Order("chicken", "rush"),
  new Order("noodle", "high"),
  new Order("rice", "normal"),
];

let highPriorityCount = orders.filter((order) =>
  order.priority.higherThan(new Priority("normal"))
).length;
console.log(highPriorityCount);
