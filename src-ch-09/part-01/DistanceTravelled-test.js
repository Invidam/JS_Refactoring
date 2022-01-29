import { distanceTravelled as after } from "./DistanceTravelled-after.js";
import { distanceTravelled as before } from "./DistanceTravelled-before.js";

function test() {
  before(scenario, time) === after(scenario, time)
    ? console.log(true)
    : console.log(before(scenario, time), after(scenario, time));
}

const scenario = {
  primaryForce: 30,
  mass: 100,
  delay: 100,
  secondaryForce: 200,
};

const time = 150;

test();
