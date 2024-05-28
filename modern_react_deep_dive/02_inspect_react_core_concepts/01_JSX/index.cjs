const BABEL = require("@babel/standalone");

BABEL.registerPlugin(
  "@babel/plugin-transform-react-jsx",
  require("@babel/plugin-transform-react-jsx")
);

const BABEL_CONFIG = {
  presets: [],
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        throwIfNamespace: false,
        runtime: "automatic",
        importSource: "custom-jsx-library",
      },
    ],
  ],
};

const SOURCE_CODE = `const ComponentA = <A>안녕하세요</A>`;

const SOURCE_CODE2 = `
const ComponentA = <A required={true}>Hello world</A>
const ComponentB = <>Hello world</>
const ComponentC = (
  <div>
    <span>hello world</span>
  </div>
)
`;

// typescript 플러그인 설정 필요
// const SOURCE_CODE3 = `
// import {createElement} from 'react';

// function TextOrHeading({
//   isHeading,
//   children,
// }:{
//   PropsWithChildren<{isHeading:boolean}>){
//   return createElement(
//     isHeading? 'h1':'span',
//     {className:'text'},
//     children,
//   )
// }
// `;

const SOURCE_CODE3 = `
import {createElement} from 'react';

function TextOrHeading({
  isHeading,
  children,
}){
  return createElement(
    isHeading? 'h1':'span',
    {className:'text'},
    children,
  )
}
`;

// code 변수에 트랜스파일된 결과가 담긴다.
// const { code } = BABEL.transform(SOURCE_CODE, BABEL_CONFIG);
// const { code } = BABEL.transform(SOURCE_CODE2, BABEL_CONFIG);
const { code } = BABEL.transform(SOURCE_CODE3, BABEL_CONFIG);
console.log(code);

/**
 * SOURCE_CODE 트랜스파일 결과
 * 
 * import { jsx as _jsx } from "custom-jsx-library/jsx-runtime";
      const ComponentA = _jsx(A, {
        children: "\uC548\uB155\uD558\uC138\uC694"
      });
 * 
 */

/**
 * SOURCE_CODE2 트랜스파일 결과 
 * 
 * import { jsx as _jsx, Fragment as _Fragment } from "custom-jsx-library/jsx-runtime";
    const ComponentA = _jsx(A, {
      required: true,
      children: "Hello world"
    });
    const ComponentB = _jsx(_Fragment, {
      children: "Hello world"
    });
    const ComponentC = _jsx("div", {
      children: _jsx("span", {
        children: "hello world"
      })
    });
 */

/**
 * SOURCE_CODE3 트랜스파일 결과 
 * 
  import { createElement } from 'react';
  function TextOrHeading({
    isHeading,
    children
  }) {
    return createElement(isHeading ? 'h1' : 'span', {
      className: 'text'
    }, children);
  }
 */
