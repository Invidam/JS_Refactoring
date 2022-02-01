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

function alertForMiscreants(people) {
  for (const p of people) {
    if (p === "사우론") {
      sendAlert();
      return "사우론";
    }
    if (p === "사루만") {
      sendAlert();
      return "사루만";
    }
    if (p === "오크") {
      sendAlert();
      return "오크";
    }
    return "";
  }
  function sendAlert() {
    console.log("악당 출현 BAAM~~");
  }
}
alertForMiscreants(people);
