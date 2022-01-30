class Organization {
  constructor(data) {
    ({ title: this._title, country: this._country } = data);
  }
  get title() {
    return this._title;
  }
  set title(aString) {
    this._title = aString;
  }

  get country() {
    return this._country;
  }
  set country(aString) {
    this._country = aString;
  }
}
const organization = new Organization({ title: "Hansu Park", country: "KR" });

console.log(organization.title);
