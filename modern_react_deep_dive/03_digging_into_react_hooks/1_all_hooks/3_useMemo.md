# 리액트 모든 훅 파헤치기(3) : useMemo와 useCallback

<details>

<summary> 1. useMemo와 useCallback의 공통점과 차이점?  </summary>

```
useMemo와 useCallback 모두 렌더링 발생 시 의존성 배열이 변했을 경우에만
함수가 실행되고 값이 저장되거나 함수가 저장됩니다.

즉, useMemo는 의존성 배열 값이. 변경됐다면 첫 번째 인수의 함수를 실행한 후에 그 값을
반환하고 그 값을 다시 기억해 둡니다.

반면 useCallback은 인수로 넘겨받은 콜백 자체를 기억합니다.
따라서 의존성 배열의 값이 변경되지 않으면 함수를 새로 생성하지 않고 재사용합니다.

useCallback는 불필요한 리소스 또는 리렌더링을 방지할 때 유용하게 쓰일 수 있습니다.

useMemo와 useCallback은 결국 무엇을 기억하느냐의 차이가 있지만,
useMemo로도 useCallback을 구현할 수 있습니다.

예를 들어,

const handleClickByuseCallback = useCallback(()=>{
    setCounter((prev)=>prev+1);
},[])

const handleClickByuseMemo = useMemo(()=>{
    return ()=> setCounter((prev)=>prev+1);
},[])

다만 코드를 읽는 사람이 혼란스러울 수 있기 때문에,
값을 기억하고 싶은 경우에는 useMemo를, 함수를 기억하고 싶은 경우에는 useCallback을 사욯합시다.

```

</details>

## 💭 TMI

> useMemo로도 useCallback을 구현할 수 있구나💡
