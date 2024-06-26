# 28장 Number

<details>

<summary> 1. Number란? </summary>

```
Number 객체는 표준 빌트인 생성자 함수 객체입니다.
Number는 원시 타입인 숫자를 다룰 때 유용한 프로퍼티와 메서드를 제공합니다.
new 연산자와 함께 호출할 경우, Number 인스턴스를 생성하고,
[[NumberData]] 내부 슬롯에 할당한 Number 래퍼 객체를 생성합니다.
new 연산자 없이 숫자로 타입변환이 가능한 값을 매개변수로 넘기면, 명시적 타입변환이 됩니다.
```

</details>

<details>

<summary> 2. Number.EPSILON은 언제 사용할까요? </summary>

```
숫자를 저장할 때, 십진수가 아닌 2진수로 저장됩니다.
부동소수점을 2진수로 나타낼 경우, 무한 소수의 경우 오차가 발생하는데,
1과 1보다 큰 수 중에서 가장 작은 수와의 차이를 나타내는 Number.EPSILON을 통해
부동소수점을 비교할 때 사용할 수 있습니다.
```

</details>

<details>

<summary> 3. Number 메소드를 통해 10진법을 2진법으로 나타낼 수 있는 방법은? </summary>

```
(4).toString(2); // 십진수 4를 2진수로 바꾸면 '100'입니다. 다만, toString은 문자열로 반환합니다.
```

</details>

## 💭 TMI

> 원시값도 객체처럼 프로퍼티와 메소드를 활용할 수 있다는 점에서<br/>
> 자바스크립트의 거의 모든 것이 객체라는 점이 더 와닿는 느낌이었다.
