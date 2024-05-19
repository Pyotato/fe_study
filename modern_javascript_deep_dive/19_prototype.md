# 19장 프로토타입

<details>

<summary> 1. 자바스크립트도 객체지향 프로그래밍 언어인가요?  </summary>

```
자바스크립트는 프로토타입 기반의 객체지향 프로그래밍 언어입니다.
객체지향 프로그래밍에서는 실체는 '속성 (특징이나 성질)'을 지니고 있고,
이러한 속성으로 실체를 인식하거나 구분할 수 있다는 것에서 출발합니다.

예를 들어, 사람은 나이,성별,이름,성격,주소,직업 등 다양한 속성을 지니고 있습니다.
여기서 구현하려는 프로그램에 '이름'과 '주소' 속성을 추려서 표현하는 것을 "추상화"라고 합니다. 사람은 속성뿐만 아니라 밥을 먹거나, 책을 읽거나 등의 행동을 할 수 있는데, 행동을 통해 데이터와 상태를 조작할 수 있습니다. 이러한 행동에 속하는 것을 '동작'이라고 합니다.

이와 같이 필요한 여러 속성과 동작이 하나의 단위로 구성된 복합적인 자료구조를 이루면 "객체"라고 합니다.


이름과 주소를 속성으로 하고, 인사를 하는 동작을 갖는 사람이라는 객체를 코드로 나타내면 아래와 같습니다.

const Person = {
    name: 'pyotato'
    address: 'Seoul'
    sayHi(){
        return `Hi! My name is ${this.name}!`;
    }
}
```

</details>

```js
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    return Math.PI * this.radius ** 2;
  };
}

const circle1 = new Circle(1);
const circle2 = new Circle(2);
```

<details>

<summary> 2. 위의 코드의 문제점은 뭘까요(인스턴스 생성과 관련하여)? 어떻게 개선할 수 있을까요?  </summary>

```
위의 코드는 Circle이라는 생성자 함수를 통해 circle1와 circle2 인스턴스를 생성했습니다.
여기서 각 인스턴스는 속성만 다르고 getArea 메서드는 중복되어 객체마다 생성되어 메모리를 불필요하게 사용한다는 문제가 있습니다.
이는 프로토타입 기반으로 프로퍼티를 상속할 수 있는 자바스크립트의 특징을 활용하면 해결할 수 있습니다.

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.getArea = function () {
    return Math.PI * this.radius ** 2;
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);

프로토타입이 아닌 생성자함수의 메서드로 getArea를 정의했을 경우,
두 인스턴스의 메서드는 동일하지 않지만, Circle 생성자 함수의 prototype에 바인딩한
getArea 메서드는 두 인스턴스가 상속하여 재사용하고 있다는 점에서 메모리를 절약할 수 있습니다.
```

</details>

<details>

<summary> 3. '__proto__' 접근지 프로퍼티와 함수 객체만이 소유하는 prototype 프로퍼티의 차이?  </summary>

```
함수 객체만이 소유하는 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로퍼티를 가리킵니다. __proto__ 접근자 프로퍼티는 객체가 자신의 프로토타입에 접근하거나 교체하기 위해 쓰이는 반면, prototype 프로퍼티는 생성자 함수가 자신의 생성할 객체의 프로토타입을 할당하기 위해 사용합니다.
따라서 사용 주체 또한 다른데, __proto__ 접근자 프로퍼티는 모든 객체가 사용하지만,
prototype 프로퍼티는 생성자 함수만이 사용 주체입니다.
```

</details>

<details>

<summary> 4. 프로토타입 체인이란?  </summary>

```
프로토타입 체인은 상속과 프로퍼티 검색을 위한 매커니즘입니다.
객체의 프로퍼티에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 [[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검샙하는 과정을 프로토타입 체인이라고 하며, 프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 상속을 구현하는 매커니즘입니다.

예를 들어,

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.getArea = function () {
    return Math.PI * this.radius ** 2;
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(Object.getPrototypeOf(circle1)===Circle.prototype); //  true
console.log(Object.getPrototypeOf(Circle.prototype)===Object.prototype); //true
console.log(circle1.hasOwnProperty('radius'));// true


console.log(Object.prototype.hasOwnProperty.call(circle1,'radius'));// true

프로토타입 체인의 최상위에 위치하는 객체는 언제나 Object.prototype이므로
모든 객체는 Object.prototype를 상속받습니다.

따라서 위의 경우에서 hasOwnProperty 메서드를 호출하면 circle1객체에서 hasOwnProperty를 검색하고 없다면 프로토타입 체인을 따라서 [[Prototype]] 내부슬롯에 바인딩되어 있는 프로토타입 Circle.prototype으로 이동하여 hasOwnProperty를 검색합니다.

Circle.prototype에도 hasOwnProperty 메서드가 없으므로 프로토타입 체인을 따라
[[Prototype]] 내부 슬롯에 바인딩되어 있는 Object.prototype으로 이동하여
hasOwnProperty 메서드를 검색합니다.
hasOwnProperty가 있으므로 Object.prototype.hasOwnProperty 매소드를 호출하고, this애 circle1 객체를 바인딩합니다.
```

</details>

<details>

<summary> 5. 정적 메서드 vs. 프로토타입 메서드?  </summary>

```
정적(static) 메서드는 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 메서드인 반면, 프로토타입 메서드는 인스턴스로 참조/호출할 수 있습니다.
정적 메서드는 프로토타입 체인에 속한 객체의 프로퍼티 메서드가 아니므로 인스턴스로 접근할 수 없습니다. 예를 들어, Object.create는 정적 메서드입니다. Object.create로 인스턴스를 생성해도 해당 인스턴스로 create 메서드를 호출할 수 없습니다.
반면, Object.prototype.hasOwnProperty는 프로토타입 메서드입니다.
Object.create로 인스턴스를 생성하면 해당 인스턴스로 hasOwnProperty 메서드를 호출할 수 있습니다. 이는 프로토타입체인 상의 최종점인 Object.prototype에 존재하기 떄문입니다.
```

</details>

## 💭 TMI

> 이전 16장 프로퍼티 attribute과 마찬가지로 한번 읽고서는 잘 기억에 남지 않아<br/>
> 두세번 읽고 정리했던 장이었다 😣<br/>
> 객체지향 프로그래밍은 결국 현실의 실체를 프로그램에 픨요한 속성과 동작만 추려서<br/>
> 객체로 묶어서 표현하려는 프로그래밍 방식으로 볼 수 있고, 자바스크립트도 prototype을 통해서 객체의 속성과 메서드(동작)을 상속하고 오버라이드할 수 있는 것!
