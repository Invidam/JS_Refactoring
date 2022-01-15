# Chapter 01 리팩터링: 첫 번째 예시

## 정리

- 1장 목표: 예시를 통해 명확히 리팩터링에 대해 알아보는 것

- 코드 수정 전 준비사항: 파악하기 쉽도록 프로그램을 재구성함 (함수와 요소로 분리시킴)

  - 이유: 올바른 구조여야 추가 or 수정이 수월함
  - 기능을 추가하기 전, 추가하기 쉬운 형태로 리팩터링을 하고 추가한다.

- 기존 코드

  <details>
  <summary>코드 보기 </summary>
  <div markdown="1">

        import INVOICE from "./mock/invoices.js";
        import PLAYS from "./mock/plays.js";
        export function statement(invoice, plays) {
          let totalAmount = 0;
          let volumeCredits = 0;
          let result = `청구내역 (고객명: ${invoice.customer})\n`;
          const format = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          }).format;
          for (let performance of invoice.performances) {
            const play = plays[performance.playID];
            let thisAmount = 0;
            switch (play.type) {
              case "tragedy":
                thisAmount = 40000;
                if (performance.audience > 30) {
                  thisAmount += 1000 * (performance.audience - 30);
                }
                break;
              case "comedy":
                thisAmount = 30000;
                if (performance.audience > 20) {
                  thisAmount += 10000 + 500 * (performance.audience - 20);
                }
                thisAmount += 300 * performance.audience;
                break;
              default:
                throw new Error(`알 수 없는 장르: ${performance.type}`);
            }
            volumeCredits += Math.max(performance.audience - 30, 0);
            if (play.type === "comedy")
              volumeCredits += Math.floor(performance.audience / 5);
            result += `${play.name}: ${format(thisAmount / 100)} (${
              performance.audience
            }석)\n`;
            totalAmount += thisAmount;
          }
          result += `총액: ${format(totalAmount / 100)}\n`;
          result += `적립 포인트: ${volumeCredits}점\n`;
          return result;
        }

        console.log(statement(INVOICE[0], PLAYS));

  </div>
  </details>

### 기존 코드에 요구되는 추가사항

- HTML을 출력
  - 문자열 대신 HTML을 출력하는 함수를 새로 작성
    - 문제점: 기존 함수 변경시 새로운 함수도 변경해야 함
- 공연 장르의 증가 or 공연료 정책 변경

  - 함수를 일일이 수정해야 함

- 리팩터링이 필요한 이유

  - 무언가를 추가해야 하고 누군가는 읽고 이해해야하는 경우가 생김
    - 이 때, 로직을 파악하기 쉬워야 하기 때문

### 리팩터링 방법 In VSCode

- Ctrl + Shift + R 로 리팩터링
- F2로 변수명 변경
- 자세한 방법은 적고 공부하기 보다 하다보면 익혀질 듯

### 책 참고없이 혼자 리팩터링해본 코드

  <details> <summary>코드 보기</summary> <div markdown="1">

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
                const standAudience =
                  PLAY_TYPE_VALUES[playType]?.stand_audience;
                const standOverAudienceRank =
                  PLAY_TYPE_VALUES[playType]?.stand_over_audience_rank;
                const standOverAudienceBaseAmount =
                  PLAY_TYPE_VALUES[playType]?.stand_over_audience_base_amount;
                const audienceRank =
                  PLAY_TYPE_VALUES[playType]?.audience_rank;
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

  </div></details>

1. 상수값들은 전역 객체를 이용하여 변경원활히 함
   - 보기가 불편하고 (변수가 너무 많아서), 한 번만 사용하므로 변경하기는 기존과 다를 바가없다.
   - 후에 책에서는 클래스를 이용하여 해결
2. 최대한 함수 하나가 하나의 기능을 담으려고 함 (이름이 너무 길어진듯)
   - 후에 책에서 말하길 기능과 리팩터링은 조화를 이루어야 한다고 함. 너무 리팩터링 위주로 기능과 조화롭지 않음
3. 배열을 순회하며 더한다는 점에서 arr.proto.reduce를 이용했다
   - 좋은 선택

### 리팩터링의 첫 단계

- 테스트 코드부터 마련해야 한다.

  - 리팩터링 과정마다 테스트 코드와 같은 결과를 내는지 확인해야 함

#### `statement()` 함수 쪼개기

1. switch문 함수 추출하기

   - switch문은 하나의 공연에 대한 요금을 계산한다.

     - 이러한 정보는 휘발성이 높아 코드에 빨리 반영해야 잊히지 않는다.
     - **switch문의 내용을 함수로 추출한다.**

   - 작은 단위씩 리팩터링을 진행해야한다.
     - 변경사항이 적다.
     - 피드백 주기가 빠르다.
     - **디버깅이 원활하다.**
   - 버전 관리 시스템을 이용하여 정상 상태 복원을 쉽게 한다.
   - 작은 단위의 함수 반환은 result로 사용한다. (개취)
   - 매개 변수의 역할이 뚜렷하지 않으면 부정관사(a/an)을 붙인다.
   - 동적 타입 언어를 쓰면 타입을 드러나게 작성한다.

   - `amountFor(aPerformance)` 처럼 완성된 문장형태로 작성하는 것 같다.

   - 임시 변수를 질의 함수로 바꾸기 (+ 변수 인라인하기 + 함수 선언 바꾸기)
     - 내가 생각하는 단점
       - 반복 호출 -> 성능 저하
         - 무의미한 수준이다. (캐시로 인한)
       - 가변성이 떨어짐
         - 함수만 바꾸면되므로 떨어지지 않는다.

2. play 변수 제거하기
   - 위와같은 임시변수 질의함수로 바꾸기 기법을 사용한다.
3. 적립 포인트 계산 코드 추출하기
4. format 변수 제거하기
   - 임시변수는 문제를 일으킬 수 있어 복잡해지기 쉬우므로 함수로 변경한다.
5. volumeCredits 변수 제거하기

- 동일하게 순회하는 반복문을 따로 빼내어 함수로 변경하였다.
- 단점: 성능 저하
  - 캐싱 기법 등으로 인해 체감할 정도의 차이는 아니다.

6. 반복문의 다른 요소들도 변수 제거하기

- 중간 단계까지의 코드

  <details>
  <summary>코드 보기 </summary>
  <div markdown="1">

          import INVOICE from "./mock/invoices.js";
          import PLAYS from "./mock/plays.js";
          export function statement(invoice, plays) {
            function amountFor(aPerformance) {
              let result = 0;
              switch (playFor(aPerformance).type) {
                case "tragedy":
                  result = 40000;
                  if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                  }
                  break;
                case "comedy":
                  result = 30000;
                  if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                  }
                  result += 300 * aPerformance.audience;
                  break;
                default:
                  throw new Error(`알 수 없는 장르: ${aPerformance.type}`);
              }
              return result;
            }
            function playFor(aPerformance) {
              return plays[aPerformance.playID];
            }
            function volumeCreditsFor(aPerformance) {
              let result = 0;
              result += Math.max(aPerformance.audience - 30, 0);
              if (playFor(aPerformance).type === "comedy")
                result += Math.floor(aPerformance.audience / 5);
              return result;
            }
            function usd(aNumber) {
              return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
              }).format(aNumber / 100);
            }
            function totalVolumeCredits() {
              let result = 0;
              for (let performance of invoice.performances) {
                result += volumeCreditsFor(performance);
              }
              return result;
            }
            function totalAmount() {
              let totalAmount = 0;
              for (let performance of invoice.performances) {
                totalAmount += amountFor(performance);
              }
              return totalAmount;
            }
            let result = `청구내역 (고객명: ${invoice.customer})\n`;
            for (let performance of invoice.performances) {
              result += `${playFor(performance).name}: ${usd(amountFor(performance))} (${
                performance.audience
              }석)\n`;
            }
            result += `총액: ${usd(totalAmount())}\n`;
            result += `적립 포인트: ${totalVolumeCredits()}점\n`;
            return result;

          }

          // console.log(statement(INVOICE[0], PLAYS));

  </div>
  </details>

### 기능 추가

- 리팩터링은 누구나할 수 있다. 다만 그 과정에서 시간을 아끼고 오류가 없이 하기 위해 정해진 규약에 따르는 것을 배워야 한다.

- 목표: Html을 출력하는 기능을 추가해야 한다.
  - 현재까지의 과정: 문자열을 출력하는 기능만 남아있고 나머지 기능은 함수로 분리되었다.
  - 해야할 것: html을 출력하는 함수와 문자열을 출력하는 함수로 나눈다. 동시에 계산 함수들은 같은 것을 사용한다.
    - 방법
      1.  문자열에 사용되는 변수들 (`customer,performances,totalVolumeCredits,totalAmount`)을 계산하는 함수를 밖으로 빼낸다.
      - 가장 작은 연관성과 기능을 가진 함수 (분리하기 쉬운 함수)부터 분리한다.
      2. 밖으로 빼낸 함수들을 파일로 분리한다.
      3. 데이터(분리된 함수의 반환값)을 가지고 문자열 or Html을 출력하는 함수를 제작한다.

<details>
  <summary>코드 보기</summary>
  <div markdown ="1">

      //Statement.js
      import createStatementData from "./CreateStatementData.js";
      import INVOICE from "./mock/invoices.js";
      import PLAYS from "./mock/plays.js";

      function usd(aNumber) {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(aNumber / 100);
      }
      export function statement(invoice, plays) {
        return renderPlainText(createStatementData(invoice, plays), plays);

        function renderPlainText(data) {
          let result = `청구내역 (고객명: ${data.customer})\n`;
          for (let performance of data.performances) {
            result += `${performance.play.name}: ${usd(performance.amount)} (${
              performance.audience
            }석)\n`;
          }
          result += `총액: ${usd(data.totalAmount)}\n`;
          result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
          return result;
        }
      }

      export function htmlStatement(invoice, plays) {
        return renderHtml(createStatementData(invoice, plays), plays);

        function renderHtml(data) {
          let result = `<h1>청구 내역 (고객명: ${data.customer} )</h1>\n`;

          result += "<table>\n";
          result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";

          for (let perf of data.performances) {
            result += `<tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
            result += `<td>${usd(perf.amount)}</td></tr>\n`;
          }
          result += "</table>\n";
          result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
          result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`;
          result += "</table>\n";

          return result;
        }
      }

      // console.log(htmlStatement(INVOICE[0], PLAYS));

```
//CreateStatementData.js
export default function createStatementData(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);

  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  statementData.totalAmount = totalAmount(statementData);
  return statementData;

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance) {
    let result = 0;
    switch (aPerformance.play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${aPerformance.type}`);
    }
    return result;
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if (aPerformance.play.type === "comedy")
      result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce(
      (total, performance) => (total += performance.volumeCredits),
      0
    );
  }
  function totalAmount(data) {
    return data.performances.reduce(
      (total, performance) => (total += performance.amount),
      0
    );
    let totalAmount = 0;
    for (let performance of data.performances) {
      totalAmount += performance.amount;
    }
    return totalAmount;
  }
  function enrichPerformance(aPerformance) {
    let result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }
}

```

  </div>
</details>

<details><summary>출력된 Html</summary><h1>청구 내역 (고객명: BigCo )</h1>
<table>
<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr><tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>
<tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>
<tr><td>Othello</td><td>40</td><td>$500.00</td></tr>
</table>
<p>총액: <em>$1,730.00</em></p>
<p>적립 포인트: <em>47</em>점</p>
</table>
 </details>

- 분석

  - 코드량 증가
  - 로직 구정요소 뚜렷이 부각됨
  - 계산과 출력 파트가 분리됨
    - 모듈화

- 리팩터링과 기능 사이에는 균형점이 있어야 한다.
  - 작업 전보다는 정돈되게 만들어야 한다.

### 다형성의 활용

- 목표: amountFor, getCreditFor 등의 함수가 공연 장르에 따라 계산 방식이 달라진다. 이를 상속을 이용해 해결하자.

  - 방법
    1. 클래스, 서브 클래스를 이용해 계산함수는 각각 비극 클래스와 희극 클래스의 메서드로 넣는다.
    2. 클래스를 가져오는 팩터리 함수를 만들어 타입을 비교한 뒤 적절한 서브 클래스를 반환한다.
    3. 반환한 값을 데이터로 넘겨준다.

  <details><summary>최종 코드 보기</summary> <div markdown="1">

  ```
  export default function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);

    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    statementData.totalAmount = totalAmount(statementData);
    return statementData;

    function playFor(aPerformance) {
      return plays[aPerformance.playID];
    }

    function totalVolumeCredits(data) {
      return data.performances.reduce(
        (total, performance) => (total += performance.volumeCredits),
        0
      );
    }
    function totalAmount(data) {
      return data.performances.reduce(
        (total, performance) => (total += performance.amount),
        0
      );
      let totalAmount = 0;
      for (let performance of data.performances) {
        totalAmount += performance.amount;
      }
      return totalAmount;
    }
    function enrichPerformance(aPerformance) {
      const calculator = createPerformanceCalculator(
        aPerformance,
        playFor(aPerformance)
      );
      let result = Object.assign({}, aPerformance);
      result.play = calculator.play;
      result.amount = calculator.amount;
      result.volumeCredits = calculator.volumeCredits;
      return result;
    }
  }
  function createPerformanceCalculator(aPerformance, aPlay) {
    switch (aPlay.type) {
      case "tragedy":
        return new TragedyCalculator(aPerformance, aPlay);
      case "comedy":
        return new ComedyCalculator(aPerformance, aPlay);
      default:
        return new TypeError(`알 수 없는 공연 장르(${aPlay}입니다.`);
    }
  }
  class PerformanceCalculator {
    constructor(aPerformance, play) {
      this.performance = aPerformance;
      this.play = play;
    }
    get amount() {
      throw new ReferenceError("서브 클래스에서 처리하도록 설계되었습니다.");
    }
    get volumeCredits() {
      return Math.max(this.performance.audience - 30, 0);
    }
  }
  class TragedyCalculator extends PerformanceCalculator {
    constructor(aPerformance, play) {
      super(aPerformance, play);
    }
    get amount() {
      let result = 40000;
      if (this.performance.audience > 30) {
        result += 1000 * (this.performance.audience - 30);
      }
      return result;
    }
  }
  class ComedyCalculator extends PerformanceCalculator {
    constructor(aPerformance, play) {
      super(aPerformance, play);
    }
    get amount() {
      let result = 30000;
      if (this.performance.audience > 20) {
        result += 10000 + 500 * (this.performance.audience - 20);
      }
      result += 300 * this.performance.audience;
      return result;
    }
    get volumeCredits() {
      let result = super.volumeCredits;
      if (this.play.type === "comedy")
        result += Math.floor(this.performance.audience / 5);
      return result;
    }
  }

  ```

  </div></details>

- 작업하며 느낀 것

  - 공통된 기능은 슈퍼클래스에서 처리한다.
  - 서브클래스에서 처리하는 기능은 슈퍼클래스에서는 차단한다.

- 분석
  - 코드량 증가
  - 조건부 로직을 생성함수로 옮김
    - 같은 타입 & 다른 형태인 요소들이 많으면 (위 예제에서는 장르) 유리할 것

### 챕터를 마치며

- 수정하기 쉬운 코드가 좋은 코드

  - 생산성 증가
  - 빠른 속도로 제공
  - 저렴한 비용으로 제공

- 이번 챕터 핵심: 리팩터링의 흐름
  - 단계를 잘게 나눔
  - 테스트를 매번 함

## 느낀점

- 01.11
  - 추상적이고 어렵지만, 재미는 있는 것같다.
  - 중요한 내용이고 내가 잘 몰라서 어려움을 느끼는 것이지 하다보면 익숙해질 것이다.
  - 내가 짜본 코드가 심각하게 못 짠 것같다. 역시 남들에게 설명하는 능력이 조금 미숙한 것 같다. (꼭 키워야겠다!!)
- 01.12
  - 부끄럽지만 클래스에 대해 아직 미숙해서 혼자 설계했을 때는 미처 생각하지 못했다.
  - 어떠한 코드가 좋은 코드인지 배웠다.
  - 리팩터링의 흐름을 이해했다.
    - 평소에 전혀 하지않았던 테스트코드 작성을 해보았다..
