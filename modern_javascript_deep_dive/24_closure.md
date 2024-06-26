# 24장 클로저

<details>

<summary> 1. 클로저란?</summary>

```
클로저는 함수와 그 함수가 선언된 렉시컬환경의 조합이라고 합니다.
이를 더 풀어서 설명하자면, 중첩된 함수에서 내부함수가 외부함수의 변수를 참조하고,
외부함수 함수의 생명주기보다 긴 경우, 예를 들어 내부함수가 리턴되는 경우 클로저라고 할 수 있습니다.
함수는 [[Environment]]에 정의된 위치에 대한 정보, 즉 상위 스코프의 참조를 저장합니다.
실행 컨텍스트 스택에서 외부 함수의 실행이 종료되어 스택에서 pop되어도, 내부함수의 생명주기가 더 길다면,
외부함수의 렉시컬 환경은 유지됩니다.

```

</details>

<details>

<summary> 2. 클로저를 활용할 수 있는 경우를 예를 들어 설명해주세요. </summary>

```
클로저를 활용하여, 의도치 않게 값이 변경되지 않도록 외부에 접근이 제한되는 '정보 은닉'을 위해 활용될 수 있습니다.
전역 변수로 선언된 경우, 암묵적 결합에 의해 의도치 않게 값을 변경해버릴 수도 있습니다.
외부함수의 변수로 선언하고, 내부함수가 해당 변수를 참조하여 값을 연산하고 리턴하는 방식으로 클로저를 활용해,
내부함수에서 변경했던 값은 접근 가능하지만, 외부함수의 값이나 내부함수 자체에는 접근을 방지할 수 있습니다.

let add = (function(){
  let num = 0;
  return function(){
    return ++num;
  };
}())

console.log(add()); // 1
console.log(add()); // 2

```

</details>

## 💭 TMI

> `A closure is the combination of a function and the lexical environment within which that function was declared.` 이 설명을 처음 들었을 때는 정말 이해가 안됐다. 사실 지금도 곱씹어서 내 말로 풀어야 소화가 되는 말 같다.<br/>
> 함수가 선언된 위치의 렉시컬 환경과 함수의 조합 => 일단 클로저는 함수구나. 함수는 자신이 정의된 위치에 따라 참조할 상위 스코프와 자신의 스코프가 정해져.<br/>
> => 자신이 선언된 위치(호출x)가 외부 함수의 변수를 참조하고, 외부 함수 밖에도 영향을 미치기 때문에, 조합이라는 말을 쓴 것 같다.
