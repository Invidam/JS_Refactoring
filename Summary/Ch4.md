# Ch4. 테스트 구축하기

## 정리

### 테스트 코드의 가치

- 대부분 디버깅에 시간을 많이 할애
  - 테스트 코드를 통해 이를 절약 가능
- 작성 시점: 프로그래밍 이전

  - 테스트 작성하다보면 기능에 대한 고민도 하게 됨
  - 구현보다는 인터페이스(두 시스템간의 접점)을 고민하게 됨
  - 프로그래밍 이후에 테스트 코드를 작성한다면, 굉장히 힘들 것 같은데 이전에 작성한다면 덜 힘들고 이미 작성한이상 꼭 테스트를 해보게 될 것 같다. [내생각]

- TDD: 테스트 작성 습관을 바탕으로한 개발 기법
  - https://martinfowler.com/bliki/TestDrivenDevelopment.html

### 예제

- Korea라는 국가의 여러 지역에 특정 상품을 파는데, 이 때 나라의 수요와 가격 & 지역의 생산비용과 생산량을 토대로 최대의 수익을 낼 수 있는 경우에 대한 지역마다의 수익과 총 수익 그리고 부족분을 구하는 예시이다.

- 요약

  1. 국가를 표현하는 Province와 지역 생산자를 표현하는 Producer 클래스를 생성한다.
  2. 각각의 메서드와 프로퍼티를 생성한다.
  3. 모카를 이용하여 테스트를 진행한다.
     - https://mochajs.org/

### 테스트

- 테스트가 내 의도에 맞게 진행되는 지 알기위해 **실패할 상황에서는 실패하도록 만들어야 한다.**
  - 테스트가 무조건 실패하는 코드를 주입
- 테스트 주기는 짧게 할 것 (몇 분 간격)

  - 적어도 1일에 1번은 전체 테스트를 할 것

- Mocha

  - assertion 라이브러리를 이용 가능
    - https://www.chaijs.com/ 사용

- 테스트 케이스
  - 너무 많다면 필요한 테스트를 놓칠 수 있다.
  - 걱정되는 영역을 집중적으로 테스트한다.
    - 위 예제에서는 총수익, 부족분 등이 그러하다.
  - happy path 이외 범위를 벗어나는 경계에 대한 테스트도 작성하면 좋다.
    - 문제가 생길만한 경계조건을 집중 테스트
    - 이럴 경우 경계를 어디에서 처리할 것이고 어떻게 처리할 건지도 고민을 해야한다.
  - Failure: 값이 예상 범위를 벗어남 [에러와 다름]
  - 내가 스스로 작성한 코드에 대해서 **억까**가 되어야 한다.
- 기댓값 설정

  - 임의의 값을 넣고 프로그램이 내놓는 값으로 대체한다.
  - 오류를 기대한 테스트가 걸러지는 지 확인한다.

- 테스트끼리의 상호작용을 막아야 한다.
- 개별 테스트마다 픽스처를 새로 만든다.

  - 픽스쳐: 무언가를 **일관되게** 테스트할 때 사용하는 환경

- with Refactoring

  - 모든 테스트를 다 작성할 필요는 없다. (의욕이 떨어진다.)
  - 리팩터링을 하며 프로그램을 이해하게 되면 더 많은 버그를 찾게된다.
    - 이 때 테스트를 추가하면 좋다.

- 버그 리포트에 해당하는 단위 테스트부터 작성하면 좋다.
- 테스트가 과한 경우보단 적은 경우가 대부분이다.

## 느낀점

- 이론과 예제를 통해 처음 테스트라는 것을 진행해보았다. 말로만 듣던 것을 해보니 어떠한 장점이 있는 지를 알게 되었다.
  - 내가 작성했던 수많은 코드들이 얼마나 부실했는지 알게되었다.
    - 괜히 사람들이 똥이라고 부르는게 아니었던 것 같다.