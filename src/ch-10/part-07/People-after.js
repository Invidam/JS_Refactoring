const people = [
  "간달프",
  "사우론",
  "아라곤",
  "프로도",
  "샘",
  "김리",
  "레골라스",
];

function checkForMiscreants(people) {
  for (const p of people) {
    if (["사우론", "사루만", "오크"].includes(p)) {
      sendAlert();
      return;
    }
    function sendAlert() {
      console.log("악당 출현 BAAM~~");
    }
  }
}
checkForMiscreants(people);
