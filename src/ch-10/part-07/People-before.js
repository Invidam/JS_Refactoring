const people = [
  "간달프",
  "사우론",
  "아라곤",
  "프로도",
  "샘",
  "김리",
  "레골라스",
  "오크",
];

function checkForMiscreants(people) {
  let found = false;
  for (const p of people) {
    if (!found) {
      if (p === "사우론") {
        sendAlert();
        found = true;
      }
      if (p === "사루만") {
        sendAlert();
        found = true;
      }
      if (p === "오크") {
        sendAlert();
        found = true;
      }
    }
  }
  function sendAlert() {
    console.log("악당 출현 BAAM~~");
  }
}
checkForMiscreants(people);
