const assert = require("assert");
let defaultOwnerData;
setDefaultOwner({ firstName: "Hansu", lastName: "Park" });

let building = { price: 1000000000 };
building.owner = defaultOwner();
console.log(building);
assert.equal("Hansu", building.owner.firstName, "Check First Name.");
let defaultOwnerData2 = defaultOwner();
defaultOwnerData2.firstName = "Hyun";
assert.equal("Hyun", building.owner.firstName, "Check First Name.");
function defaultOwner() {
  //   return defaultOwnerData;
  return Object.assign({}, defaultOwnerData);
}

function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}
