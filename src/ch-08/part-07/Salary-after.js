const people = [
  { name: "Invidam", age: 23, salary: 9100 },
  { name: "Jun-Dev", age: 31, salary: 1000000 },
  { name: "Sen-Dev", age: 42, salary: 500000000 },
  { name: "Bale", age: 32, salary: 38000000000 }, // 와;;
];

export function info() {
  return `최연소: ${youngestAgeIn(people)}, 총 급여: ${totalSalaryIn(people)}`;

  function totalSalaryIn(people) {
    return people.reduce((total, p) => total + p.salary, 0);
  }

  function youngestAgeIn(people) {
    return Math.min(...people.map((p) => p.age));
  }
}
