// /**
//  * 리팩토링 이전
//  */
class Employee {}

class Salesperson extends Employee {
  name = "Invidam";
}

class Engineer extends Employee {
  name = "Invidam";
}

/* 리팩터링 이후*/
class Employee {
  name = "Invidam";
}

class Salesperson extends Employee {
  //   name = "Invidam";
}

class Engineer extends Employee {
  //   name = "Invidam";
}

console.log(new Engineer().name);
