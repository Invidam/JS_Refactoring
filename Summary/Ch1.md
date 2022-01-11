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
            let result = `청구내역 (고객명: ${invoice.customer})\n`;
            for (let performance of invoice.performances) {
              result += `${playFor(performance).name}: ${usd(amountFor(performance))} (${
                performance.audience
              }석)\n`;
            }
            result += `총액: ${usd(totalAmount())}\n`;
            result += `적립 포인트: ${totalVolumeCredits()}점\n`;
            return result;

            function totalAmount() {
              let totalAmount = 0;
              for (let performance of invoice.performances) {
                totalAmount += amountFor(performance);
              }
              return totalAmount;
            }
          }

          // console.log(statement(INVOICE[0], PLAYS));

  </div>
  </details>

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
2. 최대한 함수 하나가 하나의 기능을 담으려고 함 (이름이 너무 길어진듯)
3. 배열을 순회하며 더한다는 점에서 arr.proto.reduce를 이용했다

## 느낀점

- 추상적이고 어렵지만, 재미는 있는 것같다.
- 중요한 내용이고 내가 잘 몰라서 어려움을 느끼는 것이지 하다보면 익숙해질 것이다.
- 내가 짜본 코드가 심각하게 못 짠 것같다. 역시 남들에게 설명하는 능력이 조금 미숙한 것 같다. (꼭 키워야겠다!!)
