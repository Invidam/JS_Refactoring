function case1() {
  const availableResources = [];
  const allocatedResources = ["GAME", "BOOK"];

  let result = resultFor(availableResources);
  allocatedResources.push(result);

  return { result, availableResources, allocatedResources };

  function resultFor() {
    let result;
    if (availableResources.length === 0) {
      result = createResource();
    } else {
      result = availableResources.pop();
    }
    return result;
  }

  function createResource() {
    return "MOVIE";
  }
}
function case2() {
  const availableResources = ["SLEEP", "FOOTBALL"];
  const allocatedResources = ["GAME", "BOOK"];

  let result = resultFor(availableResources);
  allocatedResources.push(result);

  return { result, availableResources, allocatedResources };

  function resultFor() {
    let result;
    if (availableResources.length === 0) {
      result = createResource();
    } else {
      result = availableResources.pop();
    }
    return result;
  }

  function createResource() {
    return "MOVIE";
  }
}
// console.log(case1(), case2());

export { case1, case2 };
