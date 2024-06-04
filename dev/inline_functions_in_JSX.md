# JSX 내부에서 함수를 inline으로 작성하면 어떻게 될까?

아래의 두 컴포넌트는 어떻게 다를까?

```jsx
const A = () => {
  return <button onClick={() => alert("hi")}>hi</button>;
};
```

```jsx
const B = () => {
  const alertHi = () => alert("hi");
  return <button onClick={alertHi}>hi</button>;
};
```

A와 B 컴포넌트 모두 버튼을 클릭하면 hi alert을 띄운다.

A는 리턴되는 JSX 의 안에 인라인으로 무명 화살표함수를 호출하며,
리턴문 안에 있으므로 리렌더링이 발생할 때마다 함수를 생성한다.

B는 컴포넌트 안에 alertHi라는 화살표 함수가 선언되었지만 리턴문 밖에
선언되었으므로, alertHi를 참조하여 리렌더링이 발생해도 새로 생성되지 않는다.
