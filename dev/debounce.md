# 디바운스 함수 구현하기

> 디바운스 함수는 타이머 함수를 활용해서 실행할 함수와 기다릴 밀리초를 인자로 받아
> 지정한 시간이 지나야지만 전달한 함수를 실행해준다.
> 이번 스포티파이 api를 활용한 바이닐리파이에서 검색 api를 호출할 때
> 여러번 클릭/엔터 키를 누르는 행위가 api를 불필요하게 호출하는 것을 방지하기 위해
> 디바운스 함수를 구현해봤다.

- 첫 코드

```ts
// 디바운스 걸 함수와 대기 시간을 인자로 받고
// later 함수는 타임아웃이 완료했음을 알려주는 플래그이며, 완료하면 디바운스 건 함수를 호출
// 타임아웃이 있다면 기존 존재하던 타임 아웃을 리셋하고 디바운스 기간을 리셋
// 아니면 later함수와 대기 밀리초를 넘겨주기
export const debounce = (fn: () => void, wait: number) => {
  let timeout = null as NodeJS.Timeout | string | number | undefined | null;
 .
  return (...args: unknown[]) => {
    const later = () => {
      timeout = -1;
      fn(...(args as [])); // args로 넘길 타입은 뭐로 해야할까 🤔
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = window.setTimeout(later, wait);
  };
};
```

- 문제

* 타입스크립트의 불평때문에 함수 fn의 매개변수를 []로 단언했지만..뭔가 더 정확한 타이핑이 가능할 거 같았다. 😭
* 인수는 뭐로 넘겨줘야하지..함수는 저 형태가 아닐수도 있는데...타임아웃의 타입이 뭔가 장황한데...맞나??
* [참고한 gist](https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940)

```ts
/**
 * 출처 : https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
 * */
// 디바운스 걸 함수의 타입을 제네릭 파라미터 <F>로 타입을 지정하고,
// waitFor는 딜레이할 밀리초,
// 디바운스 함수 리턴 타입은 void로 설정하고 ,
// 인수로 넘길 args는 디바운스 걸 함수 F의 파라미터의 타입을 갖음
// 타임아웃의 타입은 setTimeout의 타입의 리턴 타입!
// 🌟 setTimeout은 브라우저 환경에서는 리턴 타입이 number이지만, NodeJs 환경에서는 NodeJs.Timeout라는점!! 따라서 number로 하는 게 타입세이프한듯
// return에서는 이전 타입 아웃을 제거하고 새로운 타임아웃을 생성해주기
export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
}
```

## 💭 TMI

> setTimeout의 리턴 타입이 환경에 따라서 달라진다는 걸 처음 알았다!
> 브라우저 환경에서는 number 타입이지만, NodeJS 환경에서는 NodeJS.Timeout이구나!
> 그럼 노드환경이랑 브라우저 환경은 어떻게 다르지? [nodejs-vs-browser](https://www.geeksforgeeks.org/nodejs-vs-browser/)
