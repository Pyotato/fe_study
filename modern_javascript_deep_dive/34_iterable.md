# 34장 iterable

<details>

<summary> 1. iterable과 iterator의 차이?</summary>

```
iterable은 Symbol.iterator를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체입니다.
iterable객체는 for...in, 구조분해 할당, 스프레드 문법을 사용할 수 있습니다.
iterator는 next 메서드를 지닌 객체로, 호출 시에 현재 순회중인 iterable의 값을 나타내는 value,
순회완료 여부를 나타내는 done 프로퍼티를 갖는 iterator result 객체를 리턴합니다.
```

</details>

<details>

<summary> 2. for...of문의 내부 동작에 대해서 아시나요?</summary>

```
for ...of문은 내부적으로 iterator의 next 메서드를 호출하여 iterable을 순회하며 next 메서드가 리턴한
iterator result 객체의 value 프로퍼티 값을 for...of문의 변수에 할당합니다.
iterator result 객체의 done 프로퍼티 값이 false일 경우 iterable 순회를 계속하고, true일 경우 중단합니다.

const fruits = ['apple','banana','kiwi'];
for(let fruit of fruits){
  console.log(fruit);
  // fruit는 배열입니다.
  // 내부적으로 iterator의 next 메서드 호출를 호출합니다.
  // iterator result object {value: 'apple', done: false}
  // apple을 변수 fruit에 할당=> console.log()
  // iterator result object의 done 프로퍼티가 false이므로 다음 아이템으로 순회
  // 위의 과정 반복하고 banana => kiwi
  // 마지막 iterator result object {value: undefined, done: true} 에 도달하면 순회 중단
}
```

</details>

<details>

<summary> 3. 이터레이션 프로토콜은 데이터 소비자와 데이터 공급자를 연결하는 인터페이스의 역할을 한다. (🅾️ / ❎)</summary>

```
🅾️
이터레이션 프로토콜을 준수하는 이터러블은
데이터 소비자가 next메서드로 리턴된 done에 따라 순회여부를 결정되는 하나의 순회 방식을 가지며,
Symbol.iterator를 호출하여 for...in문, 스프레드 문법, 구조 분해 할당 등을 통해 데이터 소비자가 쓸
데이터를 공급하는 데이터 공급자 역할도 합니다.

```

</details>

<details>

<summary> 4. 사용자 이터러블을 통해 무한 피보나치 수열을 구현해보세요. (🅾️ / ❎)</summary>

```js
// 무한 수열
const fib = function () {
  let [pre, cur] = [0, 1];
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      [pre, cur] = [cur, pre + cur];
      return { value: cur };
    },
  };
};
// 인수 미만의 피보나치 수열을 담은 배열
const getfibArrTill = (max) => {
  const arr = [];
  for (const num of fib()) {
    //  지연 평가 : for문을 실행하기 전까지는 데이터를 생성하지 않아, 불필요한 메모리 사용 x
    if (num > max) break;
    arr.push(num);
  }
  return arr;
};

console.log(getfibArrTill(1000));
```

</details>

## 💭 TMI

> iterable과 iterator를 내 말로 다시 정리하자면, iterable은 Symbol.iterator를 프로퍼티로 키로 하는 메서드를 가진 객체고, iterator는 next 프로퍼티를 갖고 있는데, 이는 순회를 할 떄 필요한 정보인 done과 현재 순회중인 요소의 값을 나타내는 value를 갖고 있다. 객체가 순회가능하다는 건 iterator인 것이고, 유사배열같은 경우다. 하지만, 유사배열은 Symbol.iterator를 프로퍼티 키로 하지 않은 일반 객체이므로 for...of문이나 스프레드 문법을 쓸 수는 없다.<br/>
>
> ```js
> const arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };
> const arr = ["a", "b", "c"];
> // for(let item of arrayLike){ // arrayLike은 유사배열이지만 iterable은 아니다. 즉, Symbol.iterator를 프로퍼티 키로 갖지 않으므로 에러가 발생
> //     console.log(item);
> // }
> for (let item in arrayLike) {
>   // 유사배열은 순회는 가능하다.
>   console.log(item);
> }
> console.log(typeof arr[Symbol.iterator] === "function"); // true, 배열인 arr는 이터러블이면서 이터레이터이다.
> // Array.prototype의 메소드를 상속받았기 때문.
> console.log(typeof arrayLike[Symbol.iterator] === "function"); // false, 하지만 유사배열 arrayLike은 X,
> // 반면,Array.from()은 인수로 받은 유사배열/배열을 새로운 배열로 만들어주는 아래의 경우 이터러블이된다.
> const toArray = Array.from(arrayLike);
> console.log(typeof toArray[Symbol.iterator] === "function"); // true
> ```
