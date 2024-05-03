# 17장 생성자 함수에 의한 객체 생성

<details>

<summary> 1. 생성자 함수란 무엇인가요?  </summary>

```
constructor(생성자 함수)란 new 연산자와 함께 함수를 호출하여 객체 인스턴스를 생성하는 함수입니다.
인스턴스란, 생성자 함수에 의해 생성된 객체입니다.
```

</details>

<details>

<summary> 2. 객체리터럴보다 생성자 함수를 통해 객체를 생성하는데 장점은 무엇일까요?  </summary>

```
객체 리터럴은 객체를 생성하기 위해 {}로 프로퍼티를 직접 하나씩 정의해줘야 합니다.
만약 동일한 프로퍼티를 지닌 객체를 여러번 만들어야한다면, 이는 비효율적인 중복코드를 작성하게 되는 작업이지만,
생성자 함수를 통한 객체 생성은, 클래스와 같이 객체 탬플릿을 재사용할 수 있다는 점에서 유용합니다.

예를 들어 한 변의 길이가 1인 정사각형의 객체 square1와 한변의 길이가 2인 square2객체를 만들 경우, 객체 리터럴을 사용하면 다음과 같습니다.

const square1 = {
    side: 1,
    getArea(){
        return this.side**2;
    }
}

const square2 = {
    side: 2,
    getArea(){
        return this.side**2;
    }
}

console.log(square1.getArea());
console.log(square2.getArea());


이렇게 메소드는 중복되는 경우가 발생하는데, 이를 생성자 함수를 통해 탬플릿화할 수 있습니다.

function Square (side){
    this.side = side;
    this.getArea = function(){
        return this.side**2;
    }
}

const square1 = new Square(1);
const square2 = new Square(2);

console.log(square1.getArea());
console.log(square2.getArea());

```

</details>

<details>

<summary> 3. 함수 호출 방식에 따라 내부에서의 this를 지칭하는 대상은 어떻게 다르나요?  </summary>

```
함수는 일반함수, 생성자 함수, 메서드로 호출이 가능합니다.
일반함수로 호출이 될 경우의 함수 내부의 this는 전역 객체를 가르킵니다.

메서드로 호출이 될 경우, 자신의 객체를 가르킵니다.
즉, . (마침표 프로퍼티 접근 연산자)의 앞에 있는 객체를 지칭합니다.

마지막으로 생성자 함수 내부의 this는 지금 생성될 인스턴스를 지칭합니다.

예를 들면

function foo(){console.log(this)};

foo(); // 에서는 window (브라우저 환경에서 전역 객체는 window이므로)

const obj = {foo};
a
obj.foo(); // {foo: ƒ}

const myInstance = new foo();  // foo{}

```

</details>

<details>

<summary> 4. 생성자 함수의 인스턴스 생성 과정에 대해서 설명해주세요. </summary>

```
함수는 호출 방식에 따라 다르게 동작하는데, new 연산자와 함께 호출한 함수는 생성자 함수가 됩니다.
생성자 함수의 역할은 인스턴스를 생성하는 것과 생성된 인스턴스를 초기화하는 것입니다.
먼저, 생성자 함수는 런타임 이전에 암묵적으로 빈 객체를 생성합니다.
그리고 this 바인딩이 발생하는데, 이 때 함수 내부의 this는 이 빈 객체를 가리킵니다.
그 다음, 생성자 함수 내부에 있던 코드를 실행하며 this에 바인딩 되어 있는 인스턴스를 초기화합니다.
마지막으로 암묵적으로 인스턴스가 리턴됩니다.
만약 원시값을 리턴되면 이는 무시되며, 명시적으로 다른 객체가 리턴되면 해당 객체가 리턴됩니다.
따라서, 인스턴스 함수에는 반드시 리턴문을 생략해야 합니다.

```

</details>

<details>
<summary> 5. 함수는 객체입니다. 일반 객체와 달리 함수가 지닌 특징에는 어떤 것들이 있나요? </summary>

```
객체는 함수와 달리 호출이 불가능합니다.
함수는 객체이기 때문에 객체가 갖고 있는 내부 슬롯과 내부 메서드를 모두 포함하고 있습니다.
추가적으로, 함수는 호출이 가능한 특징에 따라 [[Environment]], [[FormalParameters]] 등의 내부 슬롯과 [[Call]], [[Construct]] 같은 내부 메서드를 지니고 있습니다.
함수는 일반 함수로서만 호출할 수 있는 객체(non-constructor)와 일반함수 또는 생성자 함수로 호출될 수 있는 객체(constructor)로 나뉩니다.

화살표 함수, 메서드 (함수 축약 표현)은 일반 함수로만 호출할 수 있는 객체지만, 생성자 함수로는 호출될 수 없습니다.
반면, 함수 선언문, 함수 표현식, 클래스는 생성자 함수로 호출될 수 있는 객체입니다.
```

</details>

<details>

<summary> 6. ECMAScript 사양에서 메서드로 인정되는 범위가 무엇인가요? </summary>

```
함수를 프로퍼티 값으로 사용하면 일반적으로 메서드라고 합니다.
하지만 ECMAScript 사양에서 메서드로 인정되는 범위는 메서드 축약 표현만 메서드로 인정합니다.

예를들어,

const obj1 = {
    x: function(){},
    y: function namedFunc(){},
    z: ()=>{},
}

const obj2 = {
    x(){}

}

obj2의 x만 메서드라고 인정됩니다.

new obj1.x();
new obj1.y();
new obj1.z(); // 에러! obj1.z는 생성자 함수가 아닙니다!
new obj2.x(); // 에러! obj2.x 는 생성자 함수가 아닙니다!

```

</details>

<details>

<summary> 7. '생성자 함수로서 호출될 수 있는 함수'는 일반 함수와 구분할 수 있나요? </summary>

```
생성자 함수가 아닌 일반함수와 생성자 함수로 호출된 함수 간의 형식적인 차이는 없습니다.
다만, 호출 시에 new 연산자를 붙이면 [[Call]] 이 아닌 [[Construct]]이 호출되어
함수 내부의 this는 생성될 인스턴스를 가리킵니다.

new 연산자 없이 생성자 함수가 호출되는 것을 방지하기 위해 생성자 함수는 파스칼 표기법으로
명명되는 컨벤션이 있었습니다.
이 또한 강제성이 없다는 한계가 있습니다.
ES6부터는 new.target를 활용해 재귀적으로 new 를 붙이도록 강제할 수 있습니다.
new.target은 this와 유사합니다.
만약 생성자 함수의 new.target이 undefined일 경우, new와 함께 호출이 되지 않았다는 것이므로,
new와 함께 생성자 함수를 리턴하도록 합니다.

하지만, 이는 IE에서는 지원되지 않아, 대신 스코프 세이프 생성자 패턴을 활용할 수 있습니다.
이는 this바인딩과 instanceof를 활용해서, 만약 this의 인스턴스가 window, 전역 객체라면
new와 함께 생성자 함수를 리턴하도록 할 수 있습니다.

```

</details>

## 💭 TMI

> 코테를 풀 때, ['1','2','3'].map((v)=>Number(v)); 이런 식으로 배열의 요소들의 타입을 변환하는 경우를 활용하고는 했다.<br/>
> 이번장에서 이 Number, String, Boolean 또한 `빌트인 생성자 함수`였다니! new 연산자를 붙였을 때는 객체가 생성되었었는데, <br/>
> 이 빌트인 생성자 함수를 그냥 호출하면 명시적 타입 변환이 되는 것이었다.
