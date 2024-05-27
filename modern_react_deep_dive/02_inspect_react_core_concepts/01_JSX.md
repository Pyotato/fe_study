# JSX란?

<details>

<summary> 1. JSX란? </summary>

```
JSX는 HTML이나 XML을 자바스크립트 내부에 표현하고 트랜스파일러에서
다양한 속성을 가진 트리 구조를 토큰화해 ECMAScript로 변환하기 위한 구문입니다.
JSX를 활요하면 XML 스타일의 트리구문을 자바스크립트 내부에서 표현하기 용이한 문법입니다.

JSX는 JSXElement, JSXAttributes, JSXChildren, JSXStrings 컴포넌트로 구성되어 있습니다.

- JSXElement : JSX를 구성하는 가장 기본 요소, HTML의 element과 비슷.
JSXElement는 4가지 중 하나의 형태이어야 합니다.

   <JSXElement JSXAttribute(optional)> // 1️⃣ : JSXOpeningElement

   </JSXElement> // 2️⃣: JSXClosingElement

    <JSXElement JSXAttribute(optional)/> // 3️⃣ JSXSelfClosingElement: 요소가 시작되고 스스로 종료되는 형태 <script/> 와 동일한 모습, 자식을 내부적으로 지닐 수 없음


    <></> // 4️⃣ jSXFragment: 아무런 요소가 없는 형태,

- JSXAttributes : JSXElement에 부여가능한 속성

   - JSXSpreadAttributes, JSXAttribute이 있다.

        - JSXSpreadAttributes는 자바스크립트 전개 연산자와 동일하다.
        - JSXAttribute에는 JSXAttributeName과 JSXAttributeValue 가 키와 값으로 이루어져 있다.
            JSXAtttributeValue로는 문자열('',""), {AssignmentExpression} (저버스크립트 값을 할당할 때 쓰는 표현식), 다른 JSXElement를 값으로 가질 수 있다.

- JSXChildren : JSXElement의 자식 값.

    - JSXChild: JSXChildren을 구성하는 기본 단위.
        - JSXText: <,>,{,}등을 제외한 문자열
        - JSXElement: 값으로 다른 JSX요소가 들어갈 수 있습니다.
        - JSXFragment: <></> 빈 JSX요소도 자식이 될 수 있습니다.
        - {JSXChildExpression (optional) } :자바스크립트 할당표현식
          아래의 예는 foo 문자열 출력
          export default function App(){
            return <>{(()=>'foo')()}<>
          }

- 리액트 내에서는 유효하지 않거나 사용하지 않는 JSX 문법도 있습니다.

    function ComponentA(){
        return <A.B></A.B>
    }

    function ComponentB(){
        return <A.B.C></A.B.C>
    }

    function ComponentC(){
        return <A:B.C></A:B.C>
    }

    function ComponentD(){
        return <$></$>
    }

    function ComponentE(){
        return <_></_>
    }


```

</details>

<details>

<summary> 2. 직접 해보기 </summary>

> [바벨 플러그인을 설치하고 직접 해보기!](./index.cjs)
> $ npm init
> $ npm i "@babel/standalone"
> $ npm i nodemon
> $ npm install --save-dev @babel/plugin-transform-react-jsx
> $ npx nodemon index.cjs

```js
import {
  jsx as _jsx,
  Fragment as _Fragment,
} from "custom-jsx-library/jsx-runtime";
const ComponentA = _jsx(A, {
  required: true,
  children: "Hello world",
});
const ComponentB = _jsx(_Fragment, {
  children: "Hello world",
});
const ComponentC = _jsx("div", {
  children: _jsx("span", {
    children: "hello world",
  }),
});
```

```js
const SOURCE_CODE2 = `
const ComponentA = <A required={true}>Hello world</A>
const ComponentB = <>Hello world</>
const ComponentC = (
  <div>
    <span>hello world</span>
  </div>
)
`;
```

</details>

## 💭 TMI

> JSX가 리액트만의 문법은 아니었구나!<br/>
> 자바스크립트 내부에 XML구조를 트리로 표현하기 쉽게하는 목적도 있었구먼..
