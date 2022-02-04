export function result() {
  class Party {
    get monthlyCost() {
      throw new Error("서브클래스를 참조해야 합니다.");
    }
    get annualCost() {
      return this.monthlyCost * 12;
    }
  }

  class Employee extends Party {
    get monthlyCost() {
      return 3000;
    }
  }

  class Department extends Party {
    get monthlyCost() {
      return 8000;
    }
  }
  const employee = new Employee();
  const department = new Department();
  return {
    employee: employee.annualCost,
    department: department.annualCost,
  };
}
