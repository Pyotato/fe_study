# useDebounce

> 저번 편에는 lodash 라이브러리를 사용하지 않고 debounce 함수 구현을 해봤다.
> 끝!하고 구현을 마친 줄 알았지만, 해당 gist에서 리액트 사용에서는 리랜더링 이슈를 해결하기 위해 여러 장치를 해줬던 쓰레드를 보고서 아직 끝이 아니었다는 걸 알게 되었다.

리액트에서 컴포넌트 리랜더링이 발생하는 조건들 중 하나가 state이 변경되었을 때다.
아래의 코드에서 `SearchInput` 컴포넌트는 키를 누를 때마다 keyword가 변경되고,
디바운스를 호출하는데 `const debounceSearch = debounce(() => onHandleSearch(), 1_000);`은 리랜더링을 할때마다 새로 호출되고, 새로운 타이머를
생성하고, 새로운 리턴 함수를 콜백과 함께 전달합니다.

해결방안

1.  한번만 디바운스가 호출되도록 함수를 컴포넌트 밖에서 호출
    ☹️ 간단하지만, 컴포넌트 내부의 state인 input값에 의존하므로 적용 불가능
2.  자바스크립트의 특징과 메모이제이션 훅을 활용(useMemo+useRef) (✅)
    - 자바스크립트 객체는 변경가능(mutable)하다.
    - 클로저 활용하기

```ts
// @/utils
// 이전 구현했던 디바운스 함수
export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number = 1_000
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
}

// 추가해준 함수
import { debounce } from "@/utils";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";

export const useDebounce = (callback: () => void) => {
  const ref: MutableRefObject<typeof callback | null> = useRef(null);
  // ref를 ref.current이 가장 최신 상태의 state에
  // 접근할 수 있는 콜백(디바운스 걸 함수)로 업데이트
  useEffect(() => {
    ref.current = callback;
  }, [callback]);
  // 디바운스 콜백을 마운트 시에 한번만 생성
  const debouncedCallback = useMemo(() => {
    const func = () => {
      // ref.current은 가장 최신의 콜백함수를 참조
      ref.current?.();
    };
    // 한번만 생성한 디바운스 함수를 리턴하기 때문에
    //클로저에 의해 최신의 디바운스된 함수에 접근 가능
    return debounce(func);
  }, []);

  return debouncedCallback;
};

// 사용
import { useSearchKeyword } from "@/hooks/query/useSearchKeyword";
import { useDebounce } from "@/hooks/useDebounce";
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useMemo,
  useState,
} from "react";

export default function SearchInput() {
  const [keyword, setKeyword] = useState("");
  const { refetch, data } = useSearchKeyword(keyword);

  // useDebounce의 useRef를 초기화할 값(함수)
  const debouncedRequest = useDebounce(() => {
    refetch();
  });
  //const debounceSearch = debounce(() => onHandleSearch(), 1_000); // 기존

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setKeyword(value);
    debouncedRequest();
  };

  const onKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") debouncedRequest();
  };

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    debouncedRequest();
  };

  return (
    <>
      <input value={keyword} onChange={onChange} onKeyUp={onKeyUp} />
      <button onClick={onClick}>검색</button>
    </>
  );
}
```

- 정리해보자면, 리액트는 컴포넌트가 state 변경이 발생하면 리랜더링이 발생하기 때문에 디바운스를 함수 또한 새로 생성되고 새로 함수가 생성되고 타이머도 새로 생긴다.
- 이를 해결하기 위해서는 디바운스 함수를 ref값에 묶어둬서 리랜더링이 되이도 리랜더링되지 않도록 하는 건데,
- ref값은 변경가능하고, 자바스크립트에서 함수는 일급 객체로 값으로 쓰일 수 있다.
- 따라서 ref값으로 디바운스를 걸 함수로 설정하고,
- useEffect로 이 디바운스된 함수의 내부의 state이 최신의 state을 반영하도록 한다.
- useMemo의 특징인 의존성 배열의 값들이 변경될 경우에만 재연산한 값을 리턴한다는 특징을 활용해서
- 빈 의존성 배열을 전달해, 마운트 될 시에만 한번만 생성되지만,
- 가장 최신의 값을 지닌 디바운스 걸 함수를 참조하게 하여 클로저를 생성하면
- 최신의 state를 지닌 디바운스 걸어준 함수에 접근가능하다.

## 출처

> [debouncing-in-react](https://www.developerway.com/posts/debouncing-in-react)

## 💭 TMI

> 이번에 새로 알게 된 것: ref값으로 함수를 넘겨줄 수 있는데, <br/>
> useEffect의 의존성 배열에 state가 들어간 그 함수를 넣어주면 state값이 변경될 때마다 ref도 따라서 update된다는 점
> 아직 뭔가 확 와닿지 않아서 한번 다른 경우도 테스트 해봐야겠다
