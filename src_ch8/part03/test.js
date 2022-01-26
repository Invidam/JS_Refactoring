import * as before from "./Picture-before.js";
import * as after from "./Picture-after.js";
const pictureData = {
  name: "jrei",
  photo: {
    title: "Cake",
    content: `
      
              _____
      _..--'''@   @'''--.._
    .'   @_/-//-\/>/>'/ @  '.
   (  @  /_<//<'/----------^-)
   |'._  @     //|###########|
   |~  ''--..@|',|}}}}}}}}}}}|
   |  ~   ~   |/ |###########|
   | ~~  ~   ~|./|{{{{{{{{{{{|
    '._ ~ ~ ~ |,/\`\`\`\`\`\`\`\`\`\`\`\`\`
      ''--.~.|//`,

    // Thank you for visiting https://asciiart.website/
    // This ASCII pic can be found at
    // https://asciiart.website/index.php?art=food%20and%20drink/other

    location: {
      name: "https://asciiart.website/index.php?art=food%20and%20drink/other",
    },
    date: new Date(),
  },
};

console.log(
  before.renderPerson(null, pictureData) ===
    after.renderPerson(null, pictureData)
    ? "TRUE"
    : "RENDER PERSON" +
        "\n" +
        before.renderPerson(null, pictureData) +
        "\n" +
        after.renderPerson(null, pictureData)
);
console.log(
  before.photoDiv(pictureData.photo) === after.photoDiv(pictureData.photo)
    ? "TRUE"
    : "PHOTO DIV \n" +
        before.photoDiv(pictureData.photo) +
        "\n" +
        after.photoDiv(pictureData.photo)
);
