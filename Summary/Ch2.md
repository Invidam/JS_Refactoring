# Ch2. 리팩터링 원칙

## 정리

### 리팩터링 정의

- 정의:
- 재구성과 리팩터링

### 두 개의 모자

- 리팩터링과 기능 추가 두 가지를 구분하여 작업해야 함.

### 리팩터링의 목적

- 좋은 설계

  - 코드량 감소 -> 이해 속도 증가
  - 중복 코드 제거 -> 고유한 일을 수행함을 보장

- SW 이해 원활

  - 의도를 코드에 담는다.

- 버그 쉽게 발견

  - 명확한 구조 -> 버그 찾기 수월

- 생산성 증가
  - 설계시간에 따른 기능의 누적
    - 좋은 설계: 지수적 증가
    - 나쁜 설계: 대수적 증가

### 리팩터링을 해야할 때

- 삼진 리팩터링: 비슷한 일을 세번째 하게되면 리팩터링을 한다.
- 준비를 위한 리팩터링: 기능 추가 or 버그 수정을 하기 전 코드 구조를 바꿔 작업을 원활히 한다.
- 이해를 위한 리팩터링: 코드를 파악할 때, 의도가 드러나도록 리팩터링 한다.
- 쓰레기 줍기 리팩터링: 원래 하던 작업이 중요할 때, 간단한 수정만 하고 나중에 개선한다.

### 계획과 습관

- 위 리팩터링 방법들은 수시로 진행한다.

  - 기회가 될 때마다 해야한다.

### 커다란 시간 소요

- 리팩터링은 코드를 깨트리지 않으므로, 한 번에 다 할 필요없이 작은 작업씩 나누어서 진행하도 괜찮다.

### 리팩터링을 하지 말아야 할 때

- 내부 동작 이해 필요 시점부터 리팩터링을 한다.

  - api처럼 호출되는 함수는 필요성이 적다.

- 새로 만드는 것이 쉬울 때도 하지않는다.

### 기타

- CI, TBD : 2,3일 주기로 브랜치를 통합
  - 리팩터링 + CI = XP

## 느낀점

- 후반 내용은 공감이 안되어서 따로 정리하지 않았다.