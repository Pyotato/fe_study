# 27장 배열

<details>

<summary> 1. 자바스크립트 배열의 특징은 무엇인가요? </summary>

```
자바스크립트의 배열은 희소배열입니다. 즉, 하나의 데이터 타입의 연속적인 데이터 집합인 밀집 배열이 아니라,
메모리 공간이 다양하고, 연속적으로 이어지지 않아도 됩니다.
자바스크립트에서 배열은 객체이며, 숫자로 된 인덱스로 데이터에 접근하는 것이 아닌,
문자열로 된 키로 접근하는 해시테이블로 구현되어 있습니다.
```

</details>

<details>

<summary> 2. 배열 생성 방식에는 어떤 것들이 있나요? </summary>

```
배열은 배열 리터럴, Array 생성자 함수, Array.of, Array.from 메서드를 통해 생성할 수 있습니다.
배열 리터럴은 const arr = []; 과 같이 생성 가능하며,
Array 생성자 함수는 const arr = new Array(1)과 같이 생성가능합니다.
생성자 함수는 인수의 개수에 따라 생성되는 배열이 달라지는데, 하나의 숫자만 전달할 경우, 원소의 개수가 됩니다.
두번째 인수부터는 원소값이 됩니다.
Array.of()는 전달된 인수들을 원소로 하는 배열을 생성(const arr = Arrayof(1,2,3); // [1, 2, 3])하며,
Array.from()은 유사배열 객체 또는 이터러블 객체를 인수로 전달받아 배열을 반환합니다.
예를 들어, Array.from('iterable') 은 ['i','t','e','r','a','b','l','e']을 생성합니다.
또한, 두번째 인수로 콜백함수를 전달하여 반환값으로 구성된 배열을 생성합니다.
예를 들어, Array.from({length:3},(_,i)=>i) 은 [0, 1, 2]을 생성합니다.
```

</details>

<details>

<summary> 3. class와 배열 메서드를 사용해서 Stack을 구현해보세요. </summary>

```js
class Stack {
  #array;
  constructor(array = []) {
    if (!Array.isArray(array)) throw new TypeError(`${array} in not an array.`);
    this.#array = array;
  }
  push(value) {
    return this.#array.push(value);
  }
  pop() {
    return this.#array.pop();
  }
  entries() {
    return [...this.#array];
  }
}

const stack = new Stack([1, 2]);
console.log(stack.entries()); // [1, 2]

stack.push(3);
console.log(stack.entries()); // [1, 2, 3]

stack.pop();
console.log(stack.entries()); // [1, 2]
```

</details>

<details>

<summary> 4. class와 배열 메서드를 사용해서 Queue를 구현해보세요. </summary>

```js
class Queue {
  #array;
  constructor(array = []) {
    if (!Array.isArray(array)) throw new TypeError(`${array} in not an array.`);
    this.#array = array;
  }
  enqueue(value) {
    return this.#array.push(value);
  }
  dequeue() {
    return this.#array.shift();
  }
  entries() {
    return [...this.#array];
  }
}

const queue = new Queue([1, 2]);
console.log(queue.entries()); // [1, 2]

queue.enqueue(3);
console.log(queue.entries()); // [1, 2, 3]

queue.dequeue();
console.log(queue.entries()); // [2, 3]
```

</details>

<details>

<summary> 5. 배열 메서드 중 중첩된 함수들을 모두 평탄화할 수 있는 방법은? </summary>

```js
array.prototype.flat(Infinity);를 통해 깊이 중첩된 배열들도 모두 일차배열로 변경할 수 있습니다.
```

</details>

## 💭 TMI

> 저번 v8이 성능최적화를 하는 방법에 대해 공부하던 중,
> v8엔진은 배열에 요소들이 할당될 떄 optimistic 추론을 한다고 했다.<br/>
> 자바스크립트 배열은 일반적인 dense array가 아니라,
> 배열 흉내를 내는 객체고, 객체는 생성될 때 히든 클래스가 생성된다고 했다는 점에서 흥미로운 실험을 해보고 싶어졌다..
> js 내부적으로도 sparse array일 경우 hashtable로 처리하기 때문에 느려진다고 했고,
> number가 실수일 경우 box를 하는데, 실수와 정수가 섞인 배열일 경우 box과정과 unbox 때문에 느려진다고 했고,
> 신기하게도 빈요소가 없는 하나의 타입의 요소의 배열의 경우 제일 적게(0.00390625 ms) 걸렸고,
> 다양한 타입의 요소(0.011962890625 ms)가 있거나, 실수형 요소도 시간이 오래 걸렸다 (0.005126953125 ms)
> 이는 기대했던 타입과 요소와 달라져, 히든 클래스가 새로 생성되고, 데이터를 box 하고 unbox하는 과정이 불필요하게 발생하기 때문이라고 했게 생각났다.
>
> ```js
> const arr = [];
> console.time("array item with varying type");
> arr[0] = 1;
> arr[1] = "2";
> arr[3] = null;
> arr[4] = 0.12112535111123542;
> arr[5] = undefined;
> console.timeEnd("array item with varying type");
> const arr2 = [];
> console.time("array item with uniform type");
> arr2[0] = 1;
> arr2[1] = 2;
> arr2[3] = 3;
> arr2[4] = 4;
> arr2[5] = 5;
> console.timeEnd("array item with uniform type");
> const arr3 = [];
> console.time("array item with non integer type");
> arr3[0] = 1;
> arr3[1] = 2;
> arr3[3] = 3;
> arr3[4] = 0.12112535111123542;
> arr3[5] = 5;
> console.timeEnd("array item with non integer type");
> /** 
> VM806:8 array item with varying type: 0.011962890625 ms
> VM806:17 array item with uniform type: 0.00390625 ms
> VM806:26 array item with non integer type: 0.005126953125 ms
> */
> ```
