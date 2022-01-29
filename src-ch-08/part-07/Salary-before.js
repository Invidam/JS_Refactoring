const people = [
  { name: "Invidam", age: 23, salary: 9100 },
  { name: "Jun-Dev", age: 31, salary: 1000000 },
  { name: "Sen-Dev", age: 42, salary: 500000000 },
  { name: "Bale", age: 32, salary: 38000000000 }, // 와;;
];

export function info() {
  let youngest = people[0] ? people[0].age : Infinity;
  let totalSalary = 0;

  for (const p of people) {
    if (p.age < youngest) {
      youngest = p.age;
    }
    totalSalary += p.salary;
  }

  return `최연소: ${youngest}, 총 급여: ${totalSalary}`;
}
// console.log(info());
