# 리액트 모든 훅 파헤치기(4) : useRef

<details>

<summary> 1. useRef와 useEffect의 차이? </summary>

```
useRef는 값이 변하더라도 렌더링을 발생시키지 않습니다.
또한 useRef의 반환값은 객체이며 ref.current로 값에 접근하거나 변경 가능합니다.
```

</details>

<details>

<summary> 2. 고정값을 사용하기 위해 useRef기 아닌 함수 외부에 값을 선언하는 것의 문제점? </summary>

```
컴포넌트 밖에서 변수를 선언하게 되면 렌더링이 발생하지 않아도 값이 기본적으로
존재하게 되어 불필요한 메모리를 낭비게 됩니다.
또헌 컴포넌트가 여러번 생성된다면 모두 같은 값을 지니게 되므로,
컴포넌트 인스턴스 고유의 값을 사용할 수 없게 됩니다.

반면 useRef는 컴포넌트 렌더링 시에만 생성되며,
컴포넌트 인스턴스가 각각 별개의 값을 바라보게 됩니다.
```

</details>

<details>

<summary> 2. useRef 사용 예? </summary>

```
useRef는 렌더링을 발생시키지 않고 상태값을 저장하고자 할 경우 유용하게 사용할 수 있습니다.
예를 들어, usePrevious 훅을 구현해보겠습니다.
```

```tsx

const usePrevious(value){
    const ref = useRef();
    useEffect(()=>{
        ref.current = value; // value가 변경되면 값을 ref에 넣기
    },[value])

    return ref.current;
}

function MyComponent(){
    const [counter,setCounter] = useState(0);
    const previousCounter = usePrevious(counter);

    function handleClick(){
        setCounter((prev)=>prev+1);
    }

    return (
        <button onClick={handleClick}>
            {counter} {previousCounter}
        </button>
    )
}

// 0 undefined
// 2 1
// 3 2

// 주의할 점은 useRef의 최초 기본값은 return 문에 정의해 둔
// DOM이 아닌,
// useRef로 넘겨받은 인수입니다.
// 따라서 선언 당시 아직 컴포넌트가 렌더링되기 전이라
// return으로 컴포넌트의 DOM이 반환되기 전이라 undefined입니다.
```

</details>

<details>

<summary> 3. useRef의 내부 구현? </summary>

```
Preact의 경우에서 살펴보자면, 의사코드는 다음과 같습니다.

export function useRef(initialValue){
    currentHook = 5;
    return useMemo(()=>({current: initialValue}),[])
}

즉, 의존성 배열이 빈 useMemo 값을 리턴해주므로
렌더링 시 의도적으로 확인할 의존성이 없다고 리액트는 판단하고, 값을
변경하지 않습니다. 따라서 리렌더링이 발생해도 같은 객체를 가리키게 됩니다.
```

</details>

## 💭 TMI

> useRef가 내부적으로 빈 배열의 useMemo를 활용해서 리렌더링이 발생해도
> 값이 유지되는 구나! 💡
