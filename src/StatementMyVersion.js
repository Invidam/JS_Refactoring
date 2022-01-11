import INVOICE from "./mock/invoices.js";
import PLAYS from "./mock/plays.js";

const PLAY_TYPE_VALUES = {
  tragedy: {
    base_amount: 40000,
    stand_audience: 30,
    stand_over_audience_rank: 1000,
    stand_over_audience_base_amount: 0,
    audience_rank: 0,
    audience_base_amount: 0,
    credit_audience_rank: 0,
  },
  comedy: {
    base_amount: 30000,
    stand_audience: 20,
    stand_over_audience_rank: 500,
    stand_over_audience_base_amount: 10000,
    audience_rank: 300,
    audience_base_amount: 0,
    credit_audience_rank: 0.2,
  },
};
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  function getThisAmount(playType, performance) {
    function getBaseThisAmount(playType) {
      return (
        PLAY_TYPE_VALUES[playType]?.base_amount ??
        new Error(`존재하지 않는 타입: ${playType}`)
      );
    }
    function getThisAmountByAudience(playType, audience) {
      const standAudience = PLAY_TYPE_VALUES[playType]?.stand_audience;
      const standOverAudienceRank =
        PLAY_TYPE_VALUES[playType]?.stand_over_audience_rank;
      const standOverAudienceBaseAmount =
        PLAY_TYPE_VALUES[playType]?.stand_over_audience_base_amount;
      const audienceRank = PLAY_TYPE_VALUES[playType]?.audience_rank;
      const audienceBaseAmount =
        PLAY_TYPE_VALUES[playType]?.audience_base_amount;
      function getThisAmountOverAudienceCase() {
        function isOver() {
          return audience > standAudience;
        }
        return isOver(standAudience)
          ? standOverAudienceBaseAmount +
              (audience - standAudience) * standOverAudienceRank
          : 0;
      }
      function getThisAmountBaseCase() {
        return audienceBaseAmount + audienceRank * audience;
      }
      return getThisAmountOverAudienceCase() + getThisAmountBaseCase();
    }
    return (
      getBaseThisAmount(playType) +
      getThisAmountByAudience(playType, performance.audience)
    );
  }

  function getVolumeCredit(audience, playType) {
    function getVolumeCreditByStandardAudience() {
      return Math.max(audience - 30, 0);
    }
    function getVolumeCreditByPlayType() {
      const creditAudienceRank =
        PLAY_TYPE_VALUES[playType]?.credit_audience_rank;
      return Math.floor(audience * creditAudienceRank);
    }
    return getVolumeCreditByStandardAudience() + getVolumeCreditByPlayType();
  }
  function getResult(playName, thisAmount, performance) {
    return `${playName}: ${format(thisAmount / 100)} (${
      performance.audience
    }석)\n`;
  }

  [totalAmount, volumeCredits, result] = invoice.performances.reduce(
    function ([totalAmount, volumeCredits, result], performance) {
      const play = plays[performance.playID];
      let thisAmount = getThisAmount(play.type, performance);
      const volumeCredit = getVolumeCredit(performance.audience, play.type);
      const thisResult = getResult(play.name, thisAmount, performance);
      return [
        totalAmount + thisAmount,
        volumeCredits + volumeCredit,
        result + thisResult,
      ];
    },
    [totalAmount, volumeCredits, result]
  );
  function addTailToResult(result, totalAmount, volumeCredits) {
    return (
      result +
      `총액: ${format(totalAmount / 100)}\n` +
      `적립 포인트: ${volumeCredits}점\n`
    );
  }
  return addTailToResult(result, totalAmount, volumeCredits);
}

console.log(statement(INVOICE[0], PLAYS));
