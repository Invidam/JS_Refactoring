const organization = { name: "Invidam", country: "KR" };

const getResult1 = () => {
  return `<h1>${organization.name}</h1>`;
};

class Organization {
  constructor(data) {
    // this. = data;
    ({ name: this._name, country: this._country } = data);
  }
  set name(arg) {
    this._name = arg;
  }
  set country(arg) {
    this._country = arg;
  }
  get name() {
    return this._name;
  }
  get country() {
    return this._country;
  }
}
const organ = new Organization(organization);

const getResult2 = () => {
  return `<h1>${getOrganization().name}</h1>`;
};

function getOrganization() {
  return organ;
}

const test = () => {
  if (getResult1() !== getResult2()) {
    console.log("❌❌❌❌❌❌❌❌");
  } else {
    console.log("✅✅✅✅✅✅✅✅✅✅✅✅");
  }
};

test();
