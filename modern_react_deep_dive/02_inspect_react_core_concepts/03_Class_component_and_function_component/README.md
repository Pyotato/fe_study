# 클레스 컴포넌트와 함수 컴포넌트

<details>

<summary> 1. 클래스 컴포넌트의 형태 </summary>

```jsx
import React from "react";

// 클래스 컴포넌트를 만들기 위해서는 클래스를 선언하고
// extend로 먼둙ㅎ자하는 컴포넌트를 extend 해줘야한다 (React.Component 또는 React.PureComponent)
// React.Component 또는 React.PureComponent의 차이는 shouldComponentUpdate🌟를 다루는 방식이다.
//   - React.Component : state 변경에 따라 렌더링
//   - React.PureComponent: state의 얕은 비교를 통해 차이가 있을 경우에만 랜더링
class SampleComponent extends React.Component {
  render() {
    return <h2>Sameple Component</h2>;
  }
}
// TMI: PureComponent로 모든 컴포넌트를 만드는 것이 좋을까?
// 얕은 비교를 하기 때문에 state가 복잡한 객체의 데이터를 갖는다면 감지를 못해 예상과는 다르게 동작할 수 있다.
```

</details>

<details>

<summary> 2. 클래스 컴포넌트의 생명 주기 메서드들  </summary>

```
- 생명주기 메서드가 실행되는 시점은 크게 3가지로 구분할 수 있습니다.
- 마운트 (mount): 컴포넌트가 마운트(생성)되는 시점
- 업데이트(update): 이미 생성된 컴포넌트의 내용이 변경(업데이트) 되는 시점
- 언마운트(unmount): 컴포넌트가 더 이상 존재하지 않는 시점

- render()
    - 리액트 클래스 컴포넌트의 유일한 필수값, 컴포넌트가 UI렌더링을 위해 쓰임
    - 호출 시점: 마운트, 업데이트
    - 항상 순수함수이어야 하며 부수 효과가 없어야 합니다.:  props/state이 들어가면 항상 같은 결과물 반환

- componentDidMount()
    - 호출 시점: 클래스 컴포넌트가 마운트외고 준비 완료 후.
    - render()와는 달리 내부에서 this.setState()로 state값 변경 가능하고,
    - this.setState()로 호출하면 state변경이 발생하고, 리랜더링이 발생합니다.
    - 브라우저가 실제로 UI업데이트를 하기 전에 실행되어 사용자가 변경되는 것을 눈치 못채게 합니다.
    - 성능 이슈가 있을 수 있다
        - 일반적으로 state를 다루는 작업은 생성자에서 하기!!
        - api호출 후 업데이트/ dom에 의존적인 작업 (이벤트 리스너 추가)등의 작업은 componentDidMount()에서
        꼭 해줘야하는 작업인지 확인해줘야 합니다.

- componentDidUpdate()
    - 호출 시점: 컴포넌트 업데이트 발생 직훈
    - state나 props의 변화에 따라 DOM 업데이트 등에 쓰임
    - this.setState 사용 가능하지만 적절한 조건으로 감싸지 않으면 게속 호출되는 일이 발생 가능하여 성능 저하

- componentWillUnmount()
    - 호출 시점: 컴포넌트가 언마운트 되거나 더이상 사용되지 않을 경우
    - 메모리 누수나 불필요한 작동(API 호출 취소, 이벤트 핸들러 제거 등, 타이머 제거)을 막기 위한 클린업 함수를 호출하기 위한 최적의 위치
    - 내부에 this.setState 호출 불가능

- shouldComponentUpdate() 🌟
    - 호출 시점(용도): state나 props의 변경으로 리액트 컴포넌트가 리렌더링되는 것을 막고 싶을 경우
    - 기본적으로 this.setState가 호출되면 컴포넌트는 리렌더링되지만 이 메서드를 사용하면 방지 가능.
    - 일반적으로 state이 변경되면 컴포넌트가 리랜더링되는게 자연스러운 동장이므로 특정한 성능 최적화 상황에서만 고려
    - React.Component와 React.PureComponent의 shouldComponentUpdate 동작이 다른데,
    PureComponent는 state값에 대한 얕은 비교만 하기 때문에 Component가 state 변경되는 족족 렌더링되는
    것과 달리 비교를 통해 변화가 있을 경우에만 렌더링됩니다.

- static getDerivedStateFromProps()
    - 호출 시점: render() 호출 직전
    - 가장 최근에 도입된 생명주기 메서드 중 하나, 이제는 사라진 componentWillReceiveProps를 대체 가능
    - static우로 선언돼 있어 this에 접근 불가
    - 반환하는 객체는 항상 해당 객체의 내용이 모두 state로 들어가게 되며, null 반환시 아무런 일이 발생하지 않음

- getSnapShotBeforeUpdate()
    - 호출 시점: DOM 업데이트 직전에 호출
    - 가장 최근에 도입된 생명 주기 메서드 중 하나, componentWillUpdate()를 대체할 수 있다
    - 반환값은 componentWillUpdate로 전달
    - 리액트 훅으로 구현되지 않았음
    - DOM 렌더링 되기 전 윈도우 크기 조절/ 스크롤 위치 조정 등 작업 처리 유용

- static getDerivedStateFromError(e)
    - 호출 시점: 에러 상황 (정상적인 생명주기 X), 자식 컴포넌트에서 에러가 발생했을 때
    - 리액트 훅으로 구현되지 않았음
    - 인수로 하위 컴포넌트의 에러를 받고,
    - 호출 시점이 에러 상황이기 때문에 리액트가 자식 컴포넌트를 어떻게 랜더링할 지 결정해줘야하기 때문에
    반드시 미리 정의해둔 state값을 반환해야함.
    - 렌더링 과정에서는 부수효과가 발생하지 않도록 해야 한다. (한다고 에러는 없지만, 렌더링 시점에 호출되는데 굳이 부수효과를 발생시켜서 랜더링 과정을 방해할 이유가 없다)
        - 부수효과: 에러에 따른 state 상태 반환 이외의 모든 작업 (console.error로 에러 로깅 포함)
        - 부수효과가 동반된 작업은 componentDidCatch()에서 해줘야 한다.

- componentDidCatch(getDerivedStateFromError와 동일한 에러 e, 어떤 컴포넌트가 에러를 발생시켰는 지 info)
    - 호출 시점: 에러 상황 (정상적인 생명주기 X), getDerivedStateFromError에서 에러를 잡고 state를 결정한 후,
     커밋단계에 실행
    - 리액트 훅으로 구현되지 않았음
    - !!주의!! 개발과 프로덕션 환경에서 다르게 작동
        - 개발 모드에서는 window까지 전파
            - window.onerror나 window.addEventListener('error',callback)과 같은 메서드도 캐치가능
        - 프로덕션 모드에서는 componentDidCatch로 잡히지 않은 에러만 window까지 전파됨

```

- `componentDidUpdate()`

```tsx
componentDidUpdate(prevProps:Props,prevState:State){
    // 아래의 조건문으로 감싸주지 않는다면 props가 변경될 때마다 fetchData가 발생 가능함
    // 따라서 props의 userName와 이전이 다른 경우에만 호출됨
    if(this.props.userName !== prevProps.userName){
        this.fetchData(this.props.userName);
    }
}
```

- `componentWillUnmount()`

```js
componentWillUnmount(){
   window.removeEventListener('resize',this.resizeListener);
   clearInterval(this.intervalId);
}
```

- `shouldComponentUpdate()` 🌟

```js
shouldComponentUpdate(nextProps: Props, nextState: State){
    // props의 title과 state의 input이 같지 않은 경우에만 컴포넌트 업데이트하기
   return this.props.title !== nextProps.title || this.state.input !== nextState.input;
}
```

- `getDerivedStateFromProps()`

```js
static getDerivedStateFromProps(nextProps: Props, nextState: State){
    // 다음 올 props를 바탕으로 현재의 state 변경하기
   if(props.name !== state.name){
    return {name: props.name} // 뱐경될 state의 형태
   }
   return null; // state 영향에 미치지 않음
}
```

- `getSnapShotBeforeUpdate()`

```js
static getSnapShotBeforeUpdate(prevProps: Props, prevState: State){
    // props 로 넘겨받은 배열의 길이가 이전보다 길어질 경우 현재 스크롤 높이값 반환
   if(prevProps.list.length< this.props.list.length){
    const list = this.listRef.current;
    return list.scrollHeight- list.scrollTop;
   }
   return null;
}

componentDidUpdate(prevProps: Props, prevState: State,snapshot:SnapShot){
    // getSnapShotBeforeUpdate로 넘겨받은 값은 snapshot에서 접근 가능
    // 값이 있다면 스크롤 위치 재조정해서 기존 아이템이 스크롤에서 밀리지 않도록
    if(snapshot !== null){
        const list = this.listRef.current;
        list.scrolling = list.scrollHeight-snapshot;
    }
}
```

- 다이어그램으로 리액트 생명 주기 살펴보기

![React lifecycle methods diagram](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*nleLui-x8YNJhZaEwwLioQ.png)

- `getDerivedStateFromError(e)` , `componentDidCatch(e, info)`

```tsx
// ErrorBoundary.tsx
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;
type State = { hasError: boolean; errorMessage: string };

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  // static 메서드이며 error를 인수로 받음
  // error는 하위 컴포넌트에서 발생한 에러
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      errorMessage: error.toString(),
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error);
    console.log(info);
  }

  render() {
    // 에러가 발생했을 경우에 렌더링할 JSX
    if (this.state.hasError) {
      return (
        <div>
          <h1>에러가 발생했습니다.</h1>
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }
    // 일반적인 상황의 Jsx
    return this.props.children;
  }
}

// App.tsx
function Add() {
  return (
    <ErrorBoundary>
      <Child />
    </ErrorBoundary>
  );
}

function Child() {
  const [error, setError] = useState(false);
  const handleClick = () => {
    setError((prev) => !prev);
  };

  if (error) {
    throw new Error("Error occured");
  }
  return <button onClick={handleClick}>에러 발생</button>;
}
```

</details>

<details>

<summary> 3. 클래스 컴포넌트의 한계 </summary>

```
함수 컴포넌트에 훅을 도입한 새로운 패러다임을 도입한 이유를 추론하자면 다음과 같은 이유들이 있다:

- 데이터 흐름 추적의 어려움
    state의 흐름을 추적하기가 까다롭습니다. 서로 다른 여러 메서드에서 state 업데이트가 발생 가능하며,
    메서드 작성 순서가 강제되지도 않기 떄문에 다른 사람이 읽기 어렵다.

- 애플리케이션 내부 로직의 재사용이 어려움
    컴포넌트간 중복 로직이 있어도 HOC으로 감싸거나 props로 넘겨주다보면 래퍼지옥에 빠져들 위험이 커짐

- 기능이 많아지면 컴포넌트 크기도 그만큼 커짐

- 클래스의 개념이 함수에 비해 생소할 수 있음
    프로토타입 기반의 언어인 자바스크립트의 특성 상 이후에 도입된 클래스의 개념보다 함수에 더 익숙하고,
    자바스크립트에 익숙하지 않아 this의 개념과 class 사용에 혼란스러울 수 있다.

- 코드 크기 최적화가 어려움
    최종 결과물인 번들 크기를 줄이는데 사용하지 않은 메서드의 트리세이킹이나 이름 최소화 등이 적용되지 않고
    그대로 번들에 포함될 수 있다.

- 핫 리로딩을 하는데 상대적으로 불리함
    코드에 변경 사항이 생겼을 떄 앱을 새로 시작하지 않고 변경 사항만 업데이트되도록 하는 핫 리로딩이
    제대로 동작하지 않습니다. 클래스 컴포넌트를 최초 렌더링 시에 instance를 생성하고 내부에 state값을 관리
    하는데, instance 내부의 render가 수정되면 이를 반영할 방법은 새로운 instance를 생성하는 것이기 때문에
    값이 초기화될 수 밖에 없습니다. 반면, 함수형 컴포넌트 클로저에 저장되기 때문에 다시 실행돼도 해당 state를
    유지할 수 있기 때문에 핫 리로딩에 유리합니다.


```

</details>

## 💭 TMI

> 클래스 컴포넌트로 작성된 코드가 너무 많이 있어 이를 deprecate시킬 일은 없다.<br/>
> 클래스 컴포넌트를 배워야하는가? 처음 리액트를 배운다면 함수형 컴포넌트를 먼저 배우고,<br/>
> 클래스 컴포넌트를 배우먄 리액트의 생명주기에 대한 이해를 할 수 있기 때문에 하는 것이 좋다.<br/>
> componentWillUnmount는 뭔가 useEffect에 return 함수로 클린업하는 거랑 비슷한 느낌?<br/>
> componentDidUpdate은 useCallback이랑 비슷한 느낌?<br/>
> shouldComponentUpdate은 useMemo랑 비슷한 느낌?
