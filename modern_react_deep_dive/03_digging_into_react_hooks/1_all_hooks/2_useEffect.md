# 리액트 모든 훅 파헤치기(2) : useEffect

<details>

<summary> 1. useEffect란? </summary>

```
useEffect는 애플리케이션 내 컴포넌트의 여러값들을 활용해 동기적으로 부수효과를 만드는 메커니즘입니다.

useEffect의 첫번째 인수로는 실행할 부수 효과가 포함된 함수고,
두번째 인수로는 의존성 배열을 전달합니다.

의존성 배열은 전달하지 않거나 빈 배열, 값이 있는 배열을 전달할 수 있습니다.

의존성 배열에 값이 있는 상태로 전달한다면,
얕은 비교를 통해 배열 내의 값이 하나라도 달라진다면 부수효과를 실행합니다.

반면 빈 배열을 제공하면, 비교할 의존성이 없다고 판단하여 최초 렌더링 시 한번만 실행합니다.
아무런 값을 넘겨주지 않는다면 의존성을 비교할 필요 없이 렌더링할 때마다 실행이
필요하다고 판단하여 렌더링이 발생할 때마다 실행됩니다.

useEffect 콜백함수 내에 클린업 함수를 return로 제공할 수 있습니다.
클린업 함수는 콜백이 실행 되기 전에 이전 상태를 청소해주는 역할을 합니다.


```

</details>

```tsx
function Component1() {
  console.log("렌더링 됨");
}

function Component2() {
  useEffect(() => {
    console.log("렌더링 됨");
  });
}
```

<details>

<summary> 2. Component1과 Component2의 차이가 있나요? </summary>

```
Component1은 직접 실행하는 함수로, 컴포넌트가ㅏ 렌더링되는 도중에 실행됩니다.
반면에 Component2의 useEffect는 컴포넌트 렌더링의 부수 효과를 만드는 함수이므로,
렌더링이 완료된 이후에 실행됩니다.

서버 사이드 렌더링의 관점에서도 useEffect는 클라이언트 사이드에서 실행되는 것을
보장해주며 useEffect 내부에서는 window 객체에 접근에 의존적인 코드를 작성해도 안전합니다.
하지만 Component1은 서버에서도 실행됩니다.
이는 함수 컴포넌트의 반환을 지연시킬 수 있으며 성능에 부정적인 영향을 미칠 수 있습니다.

```

</details>

<details>

<summary> 3. useEffect 사용 시 주의할 점들? </summary>

```
1. 부수효과를 일으킬 props나 상태들을 의존성 배열에 적절하게 전달해야합니다.

useEffect를 사용할 때에는 인수 내부에 사용하는 값 중 의존성 배열에
포함되어 있지 않을 경우 react-hooks/exhaustive-deps 룰에서 발생하는
경고를 무시해서는 안됩니다.
예를 들어, 빈 의존성 배열을 전달하여 마운트 시에만 실행하도록 의도할 수 있겠지만,
이 접근법은 componentDidMound에 기반하고 있으므로 지양해야 합니다.
useEffect의 부수효과를 일으킬 props와 state 값이 실제 변경 사항과 분리될 수 있기 때문입니다.

2. useEffect의 부수효과를 만들 콜백함수에 이름을 붙여줍시다.

흔히 useEffect의 첫번째 인자를 익명함수로 다음과 같이 작성합니다.

useEffect(()=>{
    console.log(user.id);
},[user.id]);

아는 작거나 복잡성이 낮은 경우에는 괜찮지만,
useEffect의 부수효과를 무슨 목적으로 일으킨 건 지 적절한 이름을 붙여 주면
디버깅이 더 용이해집니다.

useEffect(function logActiveUser(){
    console.log(user.id);
},[user.id]);


3. 거대한 useEffect 대신 의존성 배열을 최소화한 여러개의 useEffect으로 쪼개거나,
메모이제이션으로 정제한 값들ㅇ만 useEffect의 의존성 배열에 담아두도록 합시다.

너무 큰 useEffect는 렌더링 시 의존성 배열의 값에 변경 사항이 있을 때마다
부수효과를 발생시키는 함수를 실행합니다.
이는 부수효과의 크기가 커질수록 애플리케이션 성능에 악영향을 미칠 수 있습니다.
의존성 배열에 불가피하게 많은 변수가 들어가야 하는 상황이라면,
하나의 useEffect에 여러가지 부수효과를 내는 것보다,
여러개의 useEffect로 쪼개는 것이 좋습니다.

4. 불필요한 외부함수를 만드는 것은 지양해야 합니다.

만약 useEffect 내에서 사용할 수 있는 부수 효과라면 내부에서 만들어서
정의하는 것이 가독성 측면에서도 좋으며, 불필요한 의존성 배열도 줄일 수 있습니다.


```

</details>

<details>

<summary> 4. useEffect에서 비동기 함수를 인수로 받을 수 없다 (🅾️ , ❎)</summary>

```
🅾️

useEffect의 첫번째 인수로 바로 비동기 함수를 전달할 수는 없지만,
첫번째 인수 내부에서는 사용 가능합니다.
useEffect의 경쟁 상태를 방지하기 위해서 비동기 함수를 첫번째 인수로 넘길 수 없습니다.
예를 들어, useEffect 내부에서 state를 결과에 따라 업데이트하고자 한다면,
비동기 함수의 응답 속도에 따라 결과가 달라져 문제를 일으킬 수 있습니다.

예를 들어, 아래의 경우는 fetch 함수의 응답 속도에 따라 data값이 달라질 수 있습니다.
이전 state의 응답 속도가 이번 state 보다 빠르게 되면 이전 state값을 써버리는 문제가
발생할 수 있기 때문에
useEffect의 콜백함수는 race condition을 방지하기 위해 동기적으로 실행됩니다.

useEffect(async()=>{
    const response = await fetch('http://some.random.com');
    const result = await response.json();
    setData(result);
},[]);

다만, 다음과 같이 비동기 함수를 콜백 내부에 사용 가능합니다. 하지만
useEffect 내부에서 비동기 함수가 생성되고 실행되는 것이 반복되므로
클린업 함수에서 이전 비동기 함수에 대한 처리를 해줘야 합니다.

useEffect(()=>{
    let shouldIgnore = false;
    async function fetchData(){
        const response = await fetch('http://some.random.com');
        const result = await response.json();
        if(!shouldIgnore){
            setData(result);
        }

    }
    fetchData();

    return ()=>{
        shouldIgnore = true;
    }

},[]);

```

</details>

## 💭 TMI

> useEffect를 여러개 쓰는 게 나은가 하나에 다 쓰는게 좋은가? 에 대한
> 답이 된 거 같다. useEffect 간의 실행 순서 차이가 있나?
> [ReactJS: Taking a Look at useEffect Hook’s Execution.
> Arbaz Ajaz
> ](https://arbaz5256.medium.com/reactjs-taking-a-look-at-useeffect-hooks-execution-17f1f12e141d)에서 더 살펴봐야겠다 (~~스포: 작성 순서 대로 실행~~)
