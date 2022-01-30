export function distanceTravelled(scenario, time) {
  //자체 리팩터링
  const primaryScene = new Scene(30, 100);
  const secondaryScene = new Scene(200, 50);
  const sceneList = [primaryScene, secondaryScene];
  const scenarioData = new Scenario(sceneList, 100);
  return scenarioData.distance;

  //교재 내용
  let result;
  const primaryAcceleration = accelerationFor(
    scenario.primaryForce,
    scenario.mass
  ); // 가속도 (a) = 힘(F) / 질량(m)
  let primaryTime = Math.min(time, scenario.delay);
  result = distanceFor(0, primaryAcceleration, primaryTime); // 전파된 거리
  let secondaryTime = time - scenario.delay;

  if (secondaryTime > 0) {
    // 두 번째 힘을 반영해 다시 계산
    let primaryVelocity = primaryAcceleration * scenario.delay;
    const fullForce = scenario.primaryForce + scenario.secondaryForce;
    const secondaryAcceleration = accelerationFor(fullForce, scenario.mass);

    result += distanceFor(
      primaryVelocity,
      secondaryAcceleration,
      secondaryTime
    );
  }

  return result;
}

function distanceFor(primaryVelocity, acceleration, time) {
  return primaryVelocity * time + (1 / 2) * acceleration * time * time;
}

class Scenario {
  constructor(sceneList, mass) {
    this._sceneList = sceneList;
    this._mass = mass;
  }
  get sceneList() {
    return this._sceneList;
  }
  get mass() {
    return this._mass;
  }

  set sceneList(arg) {
    this._sceneList = arg;
  }
  get distance() {
    if (this._distance) return this._distance;
    else return this.getFullDistance();
  }
  getFullDistance() {
    this.enrichSceneList();
    return this.sceneList.reduce((prev, curr) => {
      return curr.distance + prev;
    }, 0);
  }
  get lastScene() {
    return this._sceneList[this._sceneList.length - 1];
  }
  enrichSceneList() {
    this.addAcceleration();
    this.addVelocity();
  }
  addAcceleration() {
    this.sceneList = this.sceneList.map((scene, idx) => {
      if (idx === 0)
        scene.acceleration = Scene.accelerationFor(0, scene.force, this.mass);
      else {
        const befAcc = this.sceneList[idx - 1].acceleration;
        scene.acceleration = Scene.accelerationFor(
          befAcc,
          scene.force,
          this.mass
        );
      }
      return scene;
    });
  }
  addVelocity() {
    this.sceneList = this.sceneList.map((scene, idx) => {
      if (idx === 0) scene.primaryVelocity = 0;
      else {
        const befVelocity = this.sceneList[idx - 1].finalVelocity;
        scene.primaryVelocity = befVelocity;
      }
      return scene;
    });
  }
}

class Scene {
  constructor(force, time) {
    this._force = force;
    this._time = time;
  }
  get force() {
    return this._force;
  }
  get time() {
    return this._time;
  }
  get acceleration() {
    return this._acceleration;
  }
  get primaryVelocity() {
    return this._primaryVelocity;
  }
  get finalVelocity() {
    return this.primaryVelocity + this.time * this.acceleration;
  }
  get averageVelocity() {
    return (this.primaryVelocity + this.finalVelocity) / 2;
  }
  get distance() {
    return this.averageVelocity * this.time;
  }
  set acceleration(arg) {
    this._acceleration = arg;
  }
  set primaryVelocity(arg) {
    this._primaryVelocity = arg;
  }
  static accelerationFor(befAcc, force, mass) {
    return befAcc + force / mass;
  }
}
