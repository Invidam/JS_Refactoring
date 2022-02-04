/**
 * 예시: 공통 코드가 나중에 올 때
 */
class Employee {
  constructor(name) {
    this._name = name;
  }

  get isPrivileged() {}
  finishConstruction() {
    if (this.isPrivileged) {
      // 모든 서브 클래스가 수행
      this.assignCar();
    }
  }
  assignCar() {}
}

class Manager extends Employee {
  constructor(name, grade) {
    super(name);

    this._grade = grade;
  }

  get isPrivileged() {
    return this._grade > 4;
  }
}
