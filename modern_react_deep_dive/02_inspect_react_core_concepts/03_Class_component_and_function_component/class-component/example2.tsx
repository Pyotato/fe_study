// 클래스 컴포넌트

import React from "react";

// props 타입 선언
interface SampleProps {
  required?: boolean;
  text: string;
}

// state 타입 선언
interface SampleState {
  count: number;
  isLimited?: boolean;
}

// Component에 제너릭으로 props, state 순서대로 넣어주기
class SampleComponent extends React.Component<SampleProps, SampleState> {
  // constructor에서 props를 넘겨주고 state의 기본값 설정
  // constructor()는 컴포넌트가 초기화되는 시점에 호출.
  // state를 초기화해줄 수 있고, super()를 통해 상속한 상위 컴포넌트 React.Component에 접근 가능하게 함
  private constructor(props: SampleProps) {
    super(props);
    this.state = {
      count: 0,
      isLimited: false,
    };
    // 메서드 생성 방식 (1) constructor에서 This 바인딩하는 방법
    this.handleClick = this.handleClick.bind(this);
  }

  // ES2022부터는 클래스 필드가 추가되었기 때문에 constructor없이도
  // state를 초기화할 수 있게 되었습니다.
  // state = {
  //   count: 1
  // }

  // 메서드 : render 내부에서 쓰일 함수 선언
  // 보통 DOM에서 발생하는 이벤트와 함께 사용
  // 방식 3가지 :
  // (1) constructor에서 This 바인딩하는 방법
  // (2) 화살표 함수를 쓰는 방법
  // (3) 렌더링 함수 내부에서 함수를 새롭게 만들어 전달
  private handleClick = () => {
    const newValue = this.state.count;
    this.setState({ count: newValue, isLimited: newValue >= 10 });
  };

  // 메서드 생성 방식 (2) 화살표 함수를 쓰는 방법
  // 화살표 내부의 this는 가장 가까운 상위 스코프의 this를 가리킴
  // private handleClick() {
  //   this.setState((prev) => ({ count: prev.count + 1 }));
  // }

  // render에서 이 컴포넌트가 렌더링할 내용 정의
  public render() {
    // props와 statet값을 this (해당 클래스에서 꺼내기)
    const {
      props: { required, text }, // props: 함수에 인자를 전달하는 것과 유사하게 컴포넌트에 특정 속성 전달을 담당
      state: { count, isLimited }, // state; 클래스 컴포넌트 내부에서 관리하는 값, 항상 객체이며, 값이 변경 될 때마다 리랜더링이 발생
    } = this;

    return (
      <h2>
        Sample Component
        <div>{required ? "필수" : "필수 아님"}</div>
        <div>문자: {text}</div>
        <div>count: {count}</div>
        <button onClick={this.handleClick} disabled={isLimited}>
          증가
        </button>
        {/* (3) 메서드 : 렌더링 함수 내부에서 함수를 새롭게 만들어 전달
         매번 렌더링이 발생할 때마다 새로운 함수를 생성해서 할당하므로 최적화에 좋지 않다
        <button onClick={()=>this.handleClick()} disabled={isLimited}>
          증가
        </button>
        */}
      </h2>
    );
  }
}
