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

// function alertForMiscreants(people) {
//   let found = false;
//   for (const p of people) {
//     if (!found) {
//       if (p === "사우론") {
//         sendAlert();
//         found = true;
//       }
//       if (p === "사루만") {
//         sendAlert();
//         found = true;
//       }
//       if (p === "오크") {
//         sendAlert();
//         found = true;
//       }
//     }
//   }
//   function sendAlert(miscreant = "") {
//     console.log(`악당(${miscreant}) 출현 BAAM~~`);
//   }
// }
// function findMiscreants(people) {
//   for (const p of people) {
//     if (p === "사우론") {
//       return "사우론";
//     }
//     if (p === "사루만") {
//       return "사루만";
//     }
//     if (p === "오크") {
//       return "오크";
//     }
//   }
//   return "";
// }
// const find = findMiscreants(people);
// alertForMiscreants(people);

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
  if (findMiscreants(people)) sendAlert();
}

function findMiscreants(people) {
  if (people.some((p) => isMiscreant(p))) return true;
  return false;

  function isMiscreant(p) {
    const miscreants = ["사우론", "사루만", "오크"];
    return miscreants.includes(p);
  }
}
function sendAlert() {
  console.log("악당 출현 BAAM~~");
}
alertForMiscreants(people);
