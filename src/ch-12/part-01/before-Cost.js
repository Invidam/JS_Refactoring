export function result() {
  class Party {}

  class Employee extends Party {
    get monthlyCost() {
      return 3000;
    }
    get annualCost() {
      return this.monthlyCost * 12;
    }
  }

  class Department extends Party {
    get monthlyCost() {
      return 8000;
    }
    get totalAnnualCost() {
      return this.monthlyCost * 12;
    }
  }
  const employee = new Employee();
  const department = new Department();
  return {
    employee: employee.annualCost,
    department: department.totalAnnualCost,
  };
}
