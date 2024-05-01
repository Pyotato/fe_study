# 8장 제어문

<details>
<summary> 1. 제어문이 뭔가요?  </summary>

```
제어문이란, 위에서 아래로 실행하는 프로그램 흐름을 조건에 따라 실행하거나 반복 실행하여 인위적으로 제어하는 문입니다.
제어문으로는 조건문(if-else문, switch-case문),반복문(for loop, while문, do-while문), break문, continue문 등이 있습니다.
```

</details>

<details>
<summary> 2. switch-case문을 작성할 때 fall-through(폴스루)가 발생하는 이유가 뭔가요?  </summary>

```
switch case 문의 경우, switch(표현식) 에서 표현식의 값에 따라 case의 조건과 일치할 경우 해당 문을 실행행하고
default문을 마지막에 실행하기 때문에 각 case문 마지막에 break;를 추가해줘야지 default문 실행을 방지할 수 있습니다.
fall through는 여러가지 case를 묶을 때 유용하게 쓰일 수 있습니다.

```

</details>

## 💭 TMI

> 반복문은 알고리즘에서 자주 다뤘던 부분이어서 중요하다는 것!
> 하지만 더 깔끔해서 그런지 map이나 reduce같은 고차 함수를 더 선호하게 된듯! 그래도 아리송했던 부분은 확실히 보고 가서 좋다.
> 예를 들면, switch case 에서 switch(표현식)의 경우 `표현식이 아닌 문`의 개념을 잘 몰라서 오류가 발생해 쓰기 꺼렸었는데 이번 기회를 통해 표현식인 문과 표현식이 아닌 문에 대한 개념을 확실히 익혀서 오류는 확실히 줄일 수 있을 거 같다.
