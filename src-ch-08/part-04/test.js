import { subtractDate } from "./Date.js";
import * as before from "./Person-bef.js";
import * as after from "./Person-aft.js";
class OutStream {
  constructor() {
    this._data = [];
  }
  write(arg) {
    this._data.push(arg);
  }
  print() {
    console.log(this.toString());
  }
  toString() {
    return this._data.join("\n");
  }
  equals(other) {
    return this.toString() === other.toString();
  }
}
const person = {
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

    location: "https://asciiart.website/index.php?art=food%20and%20drink/other",

    date: new Date(),
  },
};

const photos = [
  {
    title: "Lunch",
    content: `🍕`,
    location: "My home",
    date: new Date(),
  },
  {
    title: "Frequently eaten food",
    content: `🍱`,
    location: "Seven Eleven",
    date: subtractDate(new Date(), 2),
  },
  {
    title: "Favorite Food",
    content: `🍟`,
    location: "My home",
    date: subtractDate(new Date(), 7),
  },
  {
    title: "Yesterday Lunch ",
    content: `🍛`,
    location: "My home",
    date: subtractDate(new Date(), 1),
  },
];
function test() {
  console.log("RENDER PERSON---------------------\n");
  const befOutStream1 = new OutStream();
  const befOutStream2 = new OutStream();
  const aftOutStream1 = new OutStream();
  const aftOutStream2 = new OutStream();
  before.renderPerson(befOutStream1, person);
  after.renderPerson(aftOutStream1, person);
  console.log(
    befOutStream1.equals(aftOutStream1) ? true : aftOutStream1.print()
  );

  console.log("\n\n\nLIST PHOTO---------------------\n");
  before.listRecentPhotos(befOutStream2, photos);
  after.listRecentPhotos(aftOutStream2, photos);
  console.log(
    befOutStream2.equals(aftOutStream2) ? true : aftOutStream2.print()
  );
}
test();
