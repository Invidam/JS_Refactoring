import { Person as After } from "./Person-after.js";
import { Person as Before } from "./Person-before.js";

function test() {
  const before = new Before();
  const after = new After();

  before.officeAreaCode = 822;
  before.officeNumber = 6243;

  after.officeAreaCode = 822;
  after.officeNumber = 6243;

  before._telephoneNumber.equals(after._telephoneNumber)
    ? console.log(true)
    : console.log(before, after);
}

test();
