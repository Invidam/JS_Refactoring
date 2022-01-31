// 투자 등급

class Rating {
  constructor(voyage, history) {
    this.voyage = voyage;
    this.history = history;
  }
  // 항해 경로 위험요소
  get value() {
    const vpf = this.voyageProfitFactor;
    const vr = this.voyageRisk;
    const chr = this.captainHistoryRisk;
    if (vpf * 3 > vr + chr * 2) {
      return "A";
    } else {
      return "B";
    }
  }
  get voyageRisk() {
    let result = 1;

    if (this.voyage.length > 4) {
      result += 2;
    }

    if (this.voyage.length > 8) {
      result += this.voyage.length - 8;
    }

    if (["중국", "동인도"].includes(this.voyage.zone)) {
      result += 4;
    }

    return Math.max(result, 0);
  }

  // 선장의 항해 이력 위험요소
  get captainHistoryRisk() {
    let result = 1;

    if (this.history.length < 5) {
      result += 4;
    }

    result += this.history.filter((v) => v.profit < 0).length;

    return Math.max(result, 0);
  }
  // 중국을 경유하는가?
  get hasChina() {
    return this.history.some((v) => "중국" === v.zone);
  }

  // 수익 요인
  get voyageProfitFactor() {
    let result = 2;

    result += this.ZoneFactor;
    result += this.voyageFactor;
    result += this.historyLengthFactor;

    return result;
  }

  get voyageFactor() {
    return this.voyage.length > 14 ? -1 : 0;
  }

  get historyLengthFactor() {
    return this.history.length > 8 ? 1 : 0;
  }
  get ZoneFactor() {
    if (this.voyage.zone === "중국") {
      return 1;
    }
    if (this.voyage.zone === "동인도") {
      return 1;
    } else return 0;
  }
}
class ExperiencedChinaRating extends Rating {
  // 선장의 항해 이력 위험요소
  get captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }

  // 수익 요인
  get voyageProfitFactor() {
    return super.voyageProfitFactor + 3;
  }

  get historyLengthFactor() {
    return this?.history.length > 10 ? 1 : 0;
  }
}

function createRating(voyage, history) {
  if (isExperiencedChina()) return new ExperiencedChinaRating(voyage, history);
  else return new Rating(voyage, history);

  function isExperiencedChina() {
    return voyage.zone === "중국" && history.some((v) => v.zone === "중국");
  }
}
export function rating(voyage, history) {
  return createRating(voyage, history).value;
}
