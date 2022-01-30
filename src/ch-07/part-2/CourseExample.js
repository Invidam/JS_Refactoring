// class Person {
//   constructor(name) {
//     this._name = name;
//     this._courses = [];
//   }
//   get name() {
//     return this._name;
//   }
//   get courses() {
//     return this._courses;
//   }
//   set courses(aList) {
//     this._courses = this.courses;
//   }
// }

class Person {
  constructor(name) {
    this._name = name;
    this._courses = [];
  }
  get name() {
    return this._name;
  }
  get courses() {
    return this._courses;
  }
  set courses(aList) {
    this._courses = aList;
  }
  numberOfCourses() {
    return this.courses.filter((course) => course.isAdvanced).length;
  }
  addCourse(aCourse) {
    this._courses.push(aCourse);
  }
  removeCourse(
    aCourse,
    fnIfAbsent = () => {
      throw new RangeError();
    }
  ) {
    const index = this._courses.findIndex((course) => course.isEqual(aCourse));
    if (index === -1) fnIfAbsent();
    else this._courses.splice(index, 1);
  }
  //   numberOfCourses() {}
}

class Course {
  constructor(name, isAdvanced) {
    this._name = name;
    this._isAdvanced = isAdvanced;
  }
  get name() {
    return this._name;
  }
  get isAdvanced() {
    return this._isAdvanced;
  }
  isEqual(aCourse) {
    return (
      this._name === aCourse.name && this._isAdvanced === aCourse.isAdvanced
    );
  }
}
const person = new Person("Invidam");
const arr = [
  new Course("Math", true),
  new Course("C++", false),
  new Course("Java", true),
  new Course("JS", false),
  new Course("Web", false),
  new Course("NetWork", true),
  new Course("DB", true),
  new Course("Refactoring", false),
];
person.courses = arr;

console.log(person.numberOfCourses());
person.addCourse(new Course("History", true));

console.log(person.numberOfCourses());
person.removeCourse(new Course("Java", true));
console.log(person.numberOfCourses());
