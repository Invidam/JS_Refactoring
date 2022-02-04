class Stack {
  constructor(baseData = []) {
    this._stack = baseData;
  }
  get queue() {
    return this._stack;
  }
  push(elem) {
    this._stack.push(elem);
  }
  get isEmpty() {
    return !this._stack.length;
  }
  pop() {
    if (this.isEmpty) throw new Error("Stack is already empty.");
    return this._stack.pop();
  }
  print() {
    console.log(this.toString());
  }
  toString() {
    return JSON.stringify(this._stack);
  }
}
export function result(baseData) {
  const available = new Stack(baseData);
  const allocated = new Stack();
  function getResourcePool() {
    let result;
    if (available.isEmpty) {
      result = 1;
      allocated.push(result);
    } else {
      try {
        result = available.pop();
        allocated.push(result);
      } catch (error) {
        console.log(error);
        throw new Error("도달 ㅜㅂㄹ가");
        result = 1;
        allocated.push(result);
      }
    }

    return result;
  }

  const resource = getResourcePool();
  return {
    available: available.toString(),
    allocated: allocated.toString(),
    resource,
  };
}
