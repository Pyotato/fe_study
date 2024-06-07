# 리액트 모든 훅 파헤치기(1) : useState

<details>

<summary> 1. useState란? </summary>

```
useState는 함수 컴포넌트 내부에서 상태를 정의하고 관리할 수 있게 해주는 훅입니다.

const [state, setState] = useState(initialState);

위와 같은 형태를 띄며 initialState으로 초기값을 인자로 전달할 수 있습니다.
만약 매개변수없이 호출하면 초기값은 undefined가 됩니다.

useState은 배열을 반환하는데, 첫번째 배열 요소는 state값 자체이며,
두번째 배열 요소는 state값을 변경할 수 있는 setState함수입니다.

useState는 클로저를 사용해, 외부에 직접 상태값을 노출시키지 않으면서도
렌더링이 발생해도 해당 값을 정확하게 꺼내올 수 있습니다.


```

</details>

<details>

<summary> 2. useState 게으른 초기화란? </summary>

```
useState 호출 시 인자로 state의 초기값을 지정할 수 있습니다.
이 때 변수가 아니라 함수를 인자로 넘길 경우 게으른 초기화라고 합니다.

예를 들어,

const [state,setState] = useState(()=>window.localStorage.getItem('hehe'))와 같이 초기화해줄 수 있습니다.

게으른 초기화는 복잡하거나 무거운 연산을 포함할 경우 사용할 수 있으며,
오로지 state가 처음 만들어 질때만 사용되므로 함수는 한번만 실행되고,
리렌더링이 발생할 경우 재실행되지 않습니다.

filter,map와 같은 배열 접근이나 localStorage이나 sessionStorage 등에 접근하거나
비용이 많이 드거나 무거운 연산이 필요한 경우에 사용하면 좋습니다.

```

</details>

## 💭 TMI

> useState에 함수를 넣어주면 초기값으로 복잡한/무거운 연산을 한번만 실행해주는구나!💡
> 이전에는 useEffect 의존성 배열을 빈배열로 줘서 처음 마운트되면 setState해줬었는데<br/>
> 그럴 필요가 없었던 거였네..<br/>
> 그리고 api fetch해오는 값으로 초기화했던 경우에도 useState(fetch('/random.api')) 대신 useState(() => fetch('/random.api'))으로 해줬었어야한 거!
