# 컴포넌트와 함수의 무거운 연산을 기억해 두는 메모이제이션

<details>

<summary> 1. 렌더링이 변경사항만 있을 때만 발생하도록 하는게 무조건 좋지 않나요? 메모이제이션을 쓰지 않을 경우는 뭘까요? </summary>

```
메모이제이션을 무분별하게 사용하는 것은 오히려 독이 될 수 있습니다.
예를 들어 간단한 연산을 하는 경우에는 해당 연산결과를
자바스크립트 메모리 어딘가에 저장하고, 가져오는 것보다
연산을 다시 실행하는 것이 효율적일 수 있습니다.

이와 같이 이전 결과물을 저장하고 다시 가져오는 비용을 무시하고
무조건 메모이제이션을 하는 경우에는 premature optimization (섣부른 최적화)라고 합니다.

반면, 무거운 연산, 혹은 컴포넌트 렌더링이 자주 발생하고, 자식 컴포넌트가
많은 경우라면 memo나 다른 메모이제이션을 사용하는 것이 좋습니다.

(memo)
메모이제이션             안하는 비용                  안하는 비용
               1. 렌더링 비용                1. 연산 결과를 기억하는 비용
               2. 컴포넌트 내부의 복잡한        2. 기억해뒀던 연산결과를
                  로직 재실행                   다시 가져오는 비용
               3. 1과 2가 모든 자식 컴포넌
               트에 발생
               4. 이전 트리와 새로운 트리
               비교

useCallback과 useMemo을 사용할 경우               안하는 비용

- 의존성 배열을 비교하고                        - 함수를 매번 재생성
필요에 따라 값 재계산                          - 모든 객체도 재생성되므로
                                            참조가 달라지므로
                                            이 값을 다시 쓰는 경우
                                            변경된 참조로 인해 문제가
                                            발생 가능
```

</details>

```jsx
import React, { useEffect, useMemo, useState } from "react";

function useMath(number) {
  const [double, setDouble] = useState(0);
  const [triple, setTriple] = useState(0);

  useEffect(() => {
    setDouble(number * 2);
    setTriple(number * 3);
  }, [number]);
  return { double, triple }; // [1]
  //   return useMemo(() => ({ double, triple }), [double, triple]); //[2]
}

function App() {
  const [counter, setCounter] = useState(0);
  const value = useMath(10);
  useEffect(() => {
    console.log(value.double, value.triple);
  }, [value]); // 값이 변하지 않아도 계속 출력

  function handleClick() {
    setCounter((prev) => prev + 1);
  }
  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={handleClick}>+</button>
    </div>
  );
}

export default App;
```

<details>

<summary> 2. [1]과 [2]는 어떻게 다른가요? </summary>

```
+ 버튼을 클릭하면 number가 변경되니 않아도
USEEffect의 value.double, value.tropeㅇ이 계속 출력됩니다.

이는 함수 컴포넌트인 App이 호출되면서 useMath가 새롭게 계속 호출되어
객체 내부의 값은 같지만 참조가 변경되기 때문에 발생합니다.
[2]와 같이 useMemo로 값을 감싸주면 같은 결과물을 가지므로 고정값이
App에서도 쓰입니다.

```

</details>

## 💭 TMI

> 메모이제이션을 써야할 때와 그렇지 않을 때를 구분하기 위해서는 해당 지표들을 보는 방법을 배워야할 거 같다.
> 객체는 참조가 바뀌면 다른 값으로 인식할 수 있는 문제를 메모이제이션을 활용하면 방지 가능하다!
