# 33장 7번째 데이터 타입 Symbol

<details>

<summary> 1. Symbol은 무엇인가요?</summary>

```
Symbol은 null, undefined, number, string, boolean, 객체 타입 다음으로 도입된 원시 데이터 타입으로,
중복되지 않는 유일무이한 값을 생성하기 위해 심벌값을 만듭니다.
심벌은 다른 데이터 타입들과 달리 생성자 함수나 리터럴로 생성이 불가능하며, Symbol 함수로 선언 가능합니다.
Symbol을 활용해, 증복되지 않는 상수값을 생성하거나, 새로운 프로퍼티를 추가하여 이전 코드에 영향을 주지 않도록 할 수 있습니다.
예를 들어,

Array.prototype.sum = function(){
  return this.reduce((acc,curr)=>acc+curr,0);
}

// Array.prototype의 프로퍼티로 sum이 추가된다면, 프로퍼티가 덮어쓰일 위험성이 있습니다.

Array.prototype[Symbol.for('sum')] = function(){
  return this.reduce((acc,curr)=>acc+curr,0);
}

// 하지만, Symbol로 유일무이한 값을 프로퍼티로 추가한다면, 'sum' 프로퍼티는 유일하므로 덮어쓰일 위험이 없습니다.

[1,2][Symbol.for('sum')]();

```

</details>

<details>

<summary> 2. Symbol.for와 Symbol.keyFor의 쓰임?</summary>

```
Symbol.for을 통해 전역 심벌 registry에 키로 저장된 심벌 값이 없으면 새로운 심벌 값을 생성합니다.
Symbol.keyFor를 통해 전역 심벌 registry에 저장된 심벌 값의 키를 추출할 수 있습니다.

```

</details>

<details>

<summary> 3. Well-known Symbol이란?</summary>

```
자바스크립트가 기본 제공하는 빌트인 심벌값을 Well-known Symbol이라고 합니다.
Well-known Symbol을 통해 iterable 객체를 만들 수 있는데,
Well-known Symbol인 Symbol.iterator를 통해 이터레이터가 반환되도록 할 수 있습니다.
예를 들어,

const myObj = {
  test: 'test',
};

myObj[Symbol.iterator] = function* myGenerator() {
  yield this.test;
  yield 'See ya!';
};

for (const val of myObj) {
  console.log(val);
}

에서 myObj 객체에 Symbo.iterator 키를 등록하여 해당 객체가 순회가능한 (iterable)하도록 만들 수 있습니다.

```

</details>

## 💭 TMI

> 아직은 심벌을 실제로 써본 적이 없어서 그런지 와닿는 느낌은 아닌 거 같았다.<br/> > [검색](https://itnext.io/is-symbol-really-useful-6ada04ca858f)해보니까 라이브리러를 만들 때 쓰거나, 이터러블 등 객체가 특정 동작을 하게끔 할 때 쓸 수 있는 거 같다.
