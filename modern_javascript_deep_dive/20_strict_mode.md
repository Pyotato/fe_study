# 20장 strict mode

<details>

<summary> 1. strict mode를 사용하는 이유? </summary>

```
오타나 문법적 지식 미비로 인해서 코드 상의 오류가 발생할 수 있다.
strict mode는 오류를 발생시킬 가능성이 높거나 자바스크립트의 최적화 작업에 문제를 일으킬 수 있는
코드에 대한 명시적 에러를 발생시켜 코드의 안정성을 높일 수 있습니다.

코드 컨벤션을 설정 파일 형태로 설정하고 강제할 수 있기 때문에, 유사한 기능을 하는 eslint를
사용할 수도 있습니다.

```

</details>

<details>

<summary> 2. strict mode는 전역으로 설정하거나 함수 단위로 설정하는 것이 좋습니다. (🅾️ / ❎)</summary>

```
❎
전역으로 strict mode를 적용 시, 외부 서드파티 라이브러리 등은 non-strict mode인데
어떤 부분들은 strict-mode로 혼용하는 경우, 에러가 발생할 수 있습니다.
함수 단위로 적용할 경우 번거로운 뿐만 아니라, 함수 내부에는 strict mode를, 함수의 외부 컨텍스트에 strict mode를 적용하지 않을 경우 에러가 발생할 수 있다는 점에서 바람직하지 않습니다.
따라서, 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직합니다.
```

</details>

<details>

<summary> 3. strict mode 설정 시, 에러를 발생시키는 경우에는 어떤 것이 있나요?</summary>

```
strict mode 설정 시, 암묵적 전역, 변수, 매개변수, 함수를 delete 하려는 경우, 매개변수의 이름을 중복하거나 with문을 사용할 때
에러를 발생시킵니다.
암묵적 전역은 변수를 선언하지 않았는데, 해당 변수에 값을 할당하려는 등, 변수를 참조하려는 경우에 암묵적으로 전역 변수로 선언됩니다.
with문은 해당 스코프 체인에 with로 전달된 객체를 등록하려는 경우에 해당됩니다.
```

</details>

## 💭 TMI

> 프로토타입 장을 읽으면서 정리가 한번에 되지 않았던 와중 한 줄기 쉼터같은 장이었다.
