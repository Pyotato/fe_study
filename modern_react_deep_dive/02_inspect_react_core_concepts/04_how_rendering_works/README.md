# 렌더링은 어떻게 일어나는가?

<details>

<summary> 1. 리액트에서 렌더링이란?  </summary>

```
브라우저의 렌더링은 HTML과 CSS를 기반으로 웹페이지에 필요한 UI를 그리는 과정을 가리킵니다.
리액트에서 렌더링이란, 브라우저가 렌더링에 필요한 DOM 트리를 만드는 과정을 일컫습니다.
즉, 리액트 애플리케이션 트리 안에서 현재의 모든 컴포넌트의 state과 props 값을 기반으로
어떻게 UI를 구성하고 이를 바탕으로 어떤 DOM 결과를 브라우저에 제공할 것인지 계산하는 과정을
리액트 렌더링이라고 합니다.

```

</details>

<details>

<summary> 2. 리액트 렌더링이 발생할 조건?  </summary>

```
리액트에서 렌더링은 최초 렌더링과 그 이후 발생하는 모든 렌더링인 리렌더링이 있습니다.
렌더링이 발생할 시나리오는 다음과 같습니다.
    1. 최초 렌더링 : 사용자가 처음 애플리케이션에 진입하면 브라우저에 이 정보를 제공하기 위해 최초 렌더링이 발생합니다.

    2. 리렌더링
        - 클래스 컴포넌트
            - setState가 실행되는 경우
                : state의 변화는 컴포넌트의 상태 변화를 의미하므로 클래스 컴포넌트에서 state 변화를 setState 호출로 수행하면 리렌더링이 발생합니다.
            - forceUpdate가 실행되는 경우
                : 클래스 컴포넌트에서 렌더링을 수행하는 것은 인스턴스 메서드인 render()입니다.
                만약 state나 props가 아닌 다른 값에 의존하고 있어 리렌더링을 자동으로 실행할 수 없는 경우
                forceUpdate을 통해 리렌더링이 되도록 할 수 있습니다.
                다만 forceUpdate는 shouldComponentUpdate를 무시하고 하위의 모든 컴포넌트들까지 일률적으로 적용되므로 주의를 해야 합니다.
        - 함수 컴포넌트
            - useState의 두번째 배열 요소인 setter가 실행되는 경우
                : useReducer도 useState과 마찬가지로 상태와 상태 업데이트 함수를 배열로 제공하는데,
                이 두 번째 배열 요소를 실행하면 컴포넌트의 렌더링이 발생합니다.
            - 컴포넌트의 key props가 변경되는 경우
                : 리액트에서 각 sibling 속성값을 구별하기 위해 key를 사용하는데,
                key를 제공하지 않으면 파이버 내부의 sibling 인덱스만을 기준으로 판단하게 되지만,
                리렌더링이 발생하면 current 트리와 workInProgress 트리 사이에 어떤 컴포넌트가 변경되었는지
                구분하기 위해 쓰입니다.
                따라서 key값이 변경되면 다른 컴포넌트라고 인식하게 되어 리렌더링을 일으킬 수 있습니다.
            - props가 변경되는 경우
                : 부모로부터 전달받은 값인 props가 변경되면 자식 컴포넌트에서도 변경이 필요하므로 리렌더링이 발생
            - 부모 컴포넌트가 렌더링될 경우
                : 부모 컴포넌트가 리렌더링되면 자식 컴포넌트도 무조건 리렌더링됩니다.
```

</details>

<details>

<summary> 3. 리액트 렌더링 과정?  </summary>

```
리액트 렌더링 과정은 렌더 과정과 커밋 단계로 분리되어 실행되는데,

렌더 단계에서는 컴포넌트를 렌더링하고 변경 사항을 계산하는 모든 작업을 일컫습니다.
즉, 리액트에서 렌더링 프로세스가 시작되면
리액트는 컴포넌트의 루트에서부터 업데이트가 필요하다고 지정돼 있는 모든 컴포넌트를 찾습니다.
가상DOM과 비교하는 주 변경 사항은 type, props, key입니다.
이 중 하나라도 변경된 것이 잇다면 변경이 필요한 컴포넌트로 체크합니다.

업데이트가 필요하다고 지정돼 있는 컴포넌트를 발견하면
클래스 컴포넌트의 경우 render()를 실행하고,
함수 컴포넌트의 경우 FunctionComponent() 를 호출하여 결과물을 저장합니다.

렌더링 결과물은 JSX문법으로 구성되어 있으며 자바스크립트로 컴파일되면서 React.createElement()를 호출하는 구문으로
변환됩니다. createElement는 브라우저 구조를 설명할 수 있는 자바스크립트 객체를 반환하는데, 이 객체가 리액트 파이버입니다.

이 과정들을 거쳐 컴포넌트의 렌더링 결과물을 수집한 이후, 리액트의 새로운 트리인 가상 DOM과
비교하여 실제 DOM에 반영하기 위한 모든 변경 사항을 차례차례 수집하는데,
이 과정이 리액트의 재조정(reconciliation) 과정입니다.

커밋단계에서는 재조정 과정을 마치면 변경 사항을 하나의 동기 시퀀스로 DOM에 적용해 변경된 결과물을 보여줍니다.
리액트가 먼저 DOM을 커밋 단계에서 업데이트하면 만들어진 모든 DOM 노드 및 인스턴스를 가르키도록 리액트 내부의 참조를
업데이트하고,
생명주기 개념이 있는 클래스 컴포너트에서는 componentDidMount, componentDidUpdata 메서드를 호출하고,
함수 컴포넌트에서는 useLayoutEffect훅을 호출합니다.

하지만 변경사항 계산 후 반영할 것이 없다면 커밋 단계는 생략될 수 있습니다.
즉, 렌더 과정에서 변경 사항을 감지 하지 못한 경우 DOM 업데이트가 발생하지 않을 수 있습니다.

```

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRbFmWheRHBet-8bn1UKUi5HmmXtERnwCXGg&s)

</details>

```tsx
// React Dev Tools로 숫자 증가 버튼 클릿 시 렌더링 과정 확인해보기
import { useState } from "react";

export default function A() {
  return (
    <div className="App">
      <h1>Hello React!</h1>
      <B />
    </div>
  );
}

function B() {
  const [counter, setCounter] = useState(0);
  function handleButtonClick() {
    setCounter((previous) => previous + 1);
  }
  return (
    <>
      <label>
        <C number={counter} />
      </label>
      <button onClick={handleButtonClick}>+</button>
    </>
  );
}

function C({ number }) {
  return (
    <div>
      {number}
      <D />
    </div>
  );
}

function D() {
  return <>리액트 재밌다!</>;
}
```

<details>

<summary> 4. 위의 리렌더링 과정은 어떻게 실행되나요? </summary>

```
1. B 컴포넌트의 setState가 호출되고 리렌더링 작업이 렌더링 큐에 들어갑니다.
2. 리액트는 트리 최상단에서부터 렌더링 경로를 검사합니다.
3. A 컴포넌트는 변경 사항이 감지되지 않아 넘어가고, B 컴포넌트에서 리렌더링이 발생합니다. 이 때 B는 C를 반환했습니다.
4. C는 props인 number가 업데이트 되었으므로 업데이트가 필요한 컴포넌트로 체크되고 업데이트합니다. 이 때 C는 D를 반화했습니다.
5. D는 변경사항이 감지되지 않았지만 상위 컴포넌트인 C가 리렌더링되었기 때문에 리렌더링됩니다.


```

</details>

## 💭 TMI

> 이전에는 단순히 컴포넌트 단위를 잘게 쪼개야지 보기 좋고, 유지보수하기 좋은 거라서<br/>
> 피상적으로 알고 있던 거 같다. 하지만 상위 컴포넌트에서 리렌더링이 발생하면<br/>
> 하위 컴포넌트에서도 변경 사항이 없어도 렌더링이 발생한다는 걸 알게 되었다!!<br/>
