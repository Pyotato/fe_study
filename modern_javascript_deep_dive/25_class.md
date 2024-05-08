# 25장 클래스

<details>
<summary> 1. 클래스와 생성자 함수의 차이? </summary>

```
클래스와 생성자함수는 new 연산자 생략 가능 여부, extends/super 키워드 지원 여부, 호이스팅 동작 방식,
strict mode 암묵적 적용 여부, 내부 메서드 열거 가능성 방면에서 차이가 있습니다.

클래스는 인스턴스를 생성하는 목적이 분명하므로, new 연산자 없이 호출하면 에러가 발생하지만,
생성자 함수를 new 연산자 없이 호출할 경우 일반함수로 호출됩니다.
생성자함수와 달리, 클래스는 상속을 지원하는 extends와 super 키워드를 지원합니다.
클래스는 호이스팅이 발생하지 않는 것처럼 동작하지만,
함수 선언문으로 정의된 생성자 함수는 함수 호이스팅이, 함수 표현식으로 정의한 함수는 변수 호이스팅이 발샹합니다.
생성자 함수와 달리, 클래스는 암묵적으로 strict mode로 동작하며, 해제 불가능합니다.
클래스의 constructor, 프로토타입 메서드, 정적 메서드는 모두 프로퍼티 어트리뷰트 [[Enumerable]]이 false이며,
열거 불가능합니다.
```

</details>

<details>

<summary> 2. 클래스 몸체는 무엇으로 구성되어 있나요?</summary>

```
클래스의 몸체에는 생성자 1개 (혹은 생략하면 암묵적으로 생성), 정적 메서드, 프로토타입 메서드로 이루어져 있습니다.
예를 들어 보겠습니다.

class Person {
  constructor(name, hobby){
    this.name = name;
    this.hobby = hobby;
  }
  static sayHi(){
    return `hi! this(${this.name})`;
  }
  sayFullGreeting(){
    return `my name is ${this.name}. I love to ${this.hobby} in my free time!`;
  }

}

const me = new Person('Shelly','bake cookies');

console.log(me); // {name:'Shelly',hobby:'bake cookies'}
console.log(`${Person.sayHi()} ${me.sayFullGreeting()}`); //hi! this(Person) my name is Shelly. I love to bake cookies in my free time!

constructor는 인스턴스를 생성하고 초기화하기 위한 특별한 메소드입니다.
constructor내부에서 추가한 프로퍼티는 인스턴스인 me의 프로퍼티가 됩니다.

클래스가 생성한 인스턴스는 프로토타입 체인의 일원이 됩니다.
프로토타입 메서드는 이 Person.prototype의 메서드가 됩니다.

반면, 정적 메서드는 인스턴스를 생성하지 않아도 호출할 수 있는 메소드로,
메서드에 static 키워드를 붙이면 정적 메서드가 됩니다.
정적 메서드는 클래스에 바인딩됩니다. 따라서, 정적 메서드 내부의 this는 클래스를 가리키지만,
프로토타입 메서드의 this는 생성될 인스턴스를 가르킵니다.


```

</details>

<details>

<summary> 3. 클래스의 인스턴스 생성과정에 대해서 설명해주세요.</summary>

```
클래스를 new 연산자와 함께 호출하면, constructor 내부의 코드가 실행되기 전에 암묵적으로 빈 객체가 생성됩니다.
이 빈 객체가 인스턴스이며, 클래스의 프로토타입이 이 인스턴스르 가르키도록 하고, 이 객체에 this 바인딩이 발생합니다.
따라서 constructor 내부의 this는 생성한 인스턴스를 가르킵니다.

다음으로는 constructor 내부의 코드가 실행되어 전달받은 인수로 초기화되고, 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환됩니다.
```

</details>

<details>

<summary> 4. 클래스 필드 정의 제안이란?</summary>

```
클래스 필드(멤버)는 클래스 기반의 객체 지향 언어에서 클래스가 생성할 인스턴스의 프로퍼티를 가리킵니다.
자바스크립트의 클래스에서는 인스턴스에 프로퍼티를 산안히고 초기화하기 위해서는 반드시 constructor내부에서 정의되어야 했습니다.
하지만, 클래스 필드 정의 제안이 정식으로 인정된 현재, 클래스 몸체에 직접 프로퍼티를 정의할 수 있게 되었습니다.
아래와 같이
class Person {
  fieldProperty = 'field property';
  #privateField = 'private field property';
  constructor(){
      // console.log(#privateField); // Unexpected identifier '#privateField'
      console.log(this.#privateField); // private field property
  }
}
const me = new Person();
// console.log(me.fieldProperty); // field property
// console.log(Person.fieldProperty); // undefined
// console.log(Person.#privateField); // Cannot read private member #privateField from an object whose class did not declare it
console.log(me.#privateField); // private field property ?? 클래스 인스턴스를 통해 접근할 수 없어야하는 거 아닌가? (비교적 최근에 인정되어 불안정한듯)

추가적으로, 필드에 #를 붙여 private으로 정의할 수 있습니다.
private 클래스는 클래스 내부에서 접근 가능하며, 자식 클래스 내부나 클래스 인스턴스를 통해 접근할 수 없습니다.
```

</details>

<details>

<summary> 5. 수퍼 클래스를 extends 키워드로 상속하는 서브 클래스의 constructor에서 super를 호출하지 않으면 에러가 발생합니다. 그 이유는 뭘까요?</summary>

```
자바스크립트 엔진은 내부 슬롯 [[ConstructorKind]]로 클래스를 평가할 때 수퍼클래스와 서브 클래스를 구분합니다.
클래스는 암묵적으로 new 연산자로 호출 시 빈 객체를 생성하여 this를 이 인스턴스에 바인딩합니다.
그 후 constructor로 초기화를 하는데, 수퍼 클래스를 상속받는 서브 클래스는 직접 인스턴스를 생성하지 않고, 수퍼클래스에게 인스턴스를 위임합니다.
즉, super 키워드를 통해 수퍼 클래스의 constructor를 호출되고, 인스턴스가 생성되어야 하는데, super 키워드를 생략하면 인스턴스가 생성되지
않기 떄문에 에러가 발생합니다.
```

</details>

## 💭 TMI

> 두번 정도 읽어봤는데 뭔가 시원하게 이해되지는 않았다 ~~아무래도 제대로 써본 경험이 없어서 와닿지 않는 느낌..~~,<br/>
> 클래스 필드 정의 부분, private 부분들이 예제대로 동작하지 않아서 답답했다... <br/>
> 정식으로 인정된 현시점에서 공식 사이트들을 보면서 이해하도록 해봐야겠다.
