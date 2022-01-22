let info = { age: 23, isMale: true };
info = new Proxy(info, {
  get(target, prop) {
    if (prop === "ag2e") return 0;
    else return target[prop];
  },
  set(target, prop, val) {
    if (prop === "isMale") {
      console.log("ERR appear");
      throw new TypeError("Cannot change gender");
    } else {
      target[prop] = val;
      return false;
    }
  },
});

console.log(info);
info.isMale = false;
info.age = 24;
console.log(info);
