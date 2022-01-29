const people = ["male", "male", "female", "male"];

let includeFemale = false;
// BEF
for (const p of people) if (p === "female") includeFemale = true;
// AFT
// includeFemale = people.includes("female");
console.log("Does Include Female? \n", includeFemale);
