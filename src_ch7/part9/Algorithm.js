function findPerson(people) {
  for (let i = 0; i < people.length; ++i) {
    if (people[i] === "Don") return "Don";
    else if (people[i] === "John") return "John";
    else if (people[i] === "Kent") return "Kent";
    else return "";
  }
}
function findPerson(people) {
  const candidates = ["Don", "John", "Kent"];
  return people.find((person) => candidates.includes(person)) || "";
}
const peopleList = ["Invidam", "HSP", "CooKie", "Kent"];
console.log(findPerson(peopleList));
