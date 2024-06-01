// 클래스 컴포넌트

import React from "react";

// 클래스 컴포넌트를 만들기 위해서는 클래스를 선언하고
// extend로 먼둙ㅎ자하는 컴포넌트를 extend 해줘야한다 (React.Component 또는 React.PureComponent)
// React.Component 또는 React.PureComponent의 차이는 shouldComponentUpdate를 다루는 방식이다.
//   - React.Component
//   - React.PureComponent
class SampleComponent extends React.Component {
  render() {
    return <h2>Sameple Component</h2>;
  }
}

// React.PureComponent vs React.Component (shouldComponentUpdate을 다루는 방식 차이)
// 다음의 코드에서는 모두 버튼을 클릭하면 count를 1씩 올려주지만 정작 값을 사용하지 않습니다.

interface State {
  count: number;
}

type Props = Record<string, never>;

export class ReactComponent extends React.Component<Props, State> {
  private renderCounter = 0;

  private constructor(props: Props) {
    super(props);
    this.state = { count: 1 };
  }

  private handleClick = () => {
    this.setState({ count: 1 });
  };

  public render() {
    console.log("React Component", ++this.renderCounter);
    return (
      <h1>
        React Component: {this.state.count}
        <button onClick={this.handleClick}>+</button>
      </h1>
    );
  }
}

export class ReactPureComponent extends React.PureComponent<Props, State> {
  private renderCounter = 0;

  private constructor(props: Props) {
    super(props);
    this.state = { count: 1 };
  }

  private handleClick = () => {
    this.setState({ count: 1 });
  };

  public render() {
    console.log("React Component", ++this.renderCounter);
    return (
      <h1>
        React Pure Component: {this.state.count}
        <button onClick={this.handleClick}>+</button>
      </h1>
    );
  }
}

export default function CompareComponent() {
  return (
    <>
      <h2>React.Component</h2>
      <ReactComponent /> {/*  state가 업데이트되는 대로 렌더링 발생*/}
      <h2>React.PureComponent</h2>
      <ReactPureComponent />
      {/* state값이 업데이트 되지 않아 렌더링이 발생하지 않음 */}
    </>
  );
}
