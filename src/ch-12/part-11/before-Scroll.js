const ChronoUnit = {
  DAYS: 86400000,
};
class CatalogItem {
  constructor(id, title, tags) {
    this._id = id;
    this._title = title;
    this._tags = tags;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  hasTag(arg) {
    return this._tags.includes(arg);
  }
}

export class Scroll extends CatalogItem {
  constructor(id, title, tags, dataLastCleaned) {
    super(id, title, tags);

    this._lastCleaned = dataLastCleaned;
  }

  needsCleaning(targetDate) {
    const threshold = this.hasTag("revered") ? 700 : 1500;
    //한계점보다 오래동안 세척이 되지않았으면 씻는다.
    return this.daysSinceLastCleaning(targetDate) > threshold;
  }

  daysSinceLastCleaning(targetDate) {
    return this._lastCleaned.until(targetDate, ChronoUnit.DAYS);
  }
}
export function makeScroll(data) {
  const { id, title, tags, dataLastCleaned } = data;
  return new Scroll(id, title, tags, dataLastCleaned);
}
