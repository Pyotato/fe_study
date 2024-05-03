# 18장 함수와 일급 객체

<details>

<summary> 1. 일급 객체(<sub>first-class object</sub>)의 조건 4가지?</summary>

```
객체가 일급객체이기 위해서는 다음 4가지 조건을 만족해야합니다.

1. 무명의 리터럴로 생성가능합니다. 즉, 런타임에도 생성할 수 있습니다.
2. 값으로 변수나 객체(배열, 객체, 함수 등)를 가질 수 있습니다.
3. 함수의 매개변수로 함수 내부에 전달 가능합니다.
4. 함수의 반환값으로 객체를 리턴할 수 있습니다.

```

</details>

<details>

<summary> 2. 함수는 일급객체라고 합니다. 일급객체의 조건과 함께 예시를 들어 주세요.</summary>

```
생성자 함수는 함수이자 일급 객체입니다.

function Square (side){
    this.side = side;
    this.getArea = function(){ // 여기서 1 런타임에 무명 리터럴로 생성된 예입니다.
        return this.side**2;
    }
    // 4 암묵적으로 생성자 함수는 인스턴스를 리턴합니다. 즉, 리턴 값이 객체입니다.
}

const mySide = (i)=> i;

const sqr1 = new Square(mySide(1)); // 여기서 3 함수가 매개변수로 전달되어 Square 함수의 내부에 전달되었습니다.

const sqr2 = new Square(mySide(2)); // 여기서 3 함수가 매개변수로 전달되어 Square 함수의 내부에 전달되었습니다.

const obj ={sqr1, arr:[sqr1,sqr2]}; // 여기서 2 값으로 변수를 저장하거나 자료구조 (배열)을 저장할 수 있습니다.
console.log(sqr1);
console.log(obj);

```

</details>

<details>

<summary> 3. 함수의 모든 프로퍼티 어트리뷰트는 Object.getOwnPropertyDescriptors(함수명)을 통해 확인할 수 있다.(🅾️ / ❎)</summary>

```
🅾️
함수는 객체다. 객체는 프로퍼티가 있으므로, console.dir()로 함수 객체의 내부를 확인할 있으며,
Object.getOwnPropertyDescriptors를 통해서도 확인 가능하다.
```

</details>

<details>

<summary> 4. __proto__ 는 함수 객체의 고유 프로퍼티이다. (🅾️ / ❎)</summary>

```
❎
함수 객체의 고유 프로퍼티에는
arguments, caller, length, name, prototype 이 있다.
__proto__는 접근자 프로퍼티이며, Object.prototype 객체의 프로퍼티를 상속받은 것이다.

Object.prototype는 모든 객체가 상속받아 사용하는 프로퍼티이며 모든 객체가 사용 가능하다.
```

</details>

<details>

<summary> 5. 함수 객체의 고유 프로퍼티에는 어떤 것들이 있나요? 각각의 프로퍼티에 대해 설명해주세요.</summary>

```
함수 객체의 프로퍼티로는 arguments, caller, length, name, prototype이 있습니다.

arguments 프로퍼티의 값은 arguments객체입니다.
arguments는 순회 가능한 유사배열이며, 매개변수로 전달받은 인수들의 정보를 담고 있습니다.
자바스크립트는 인수의 개수를 확인하지 않습니다.
함수가 호출되면 암묵적으로 매개변수가 선언되며 undefined로 초기화되며, 인수는 이후에 할당됩니다.

caller 프로퍼티는 ECMAScript의 정식 사양은 아니지만, 함수 자신을 호출한 함수를 가리킨다.

length 프로퍼티는 매개변수의 개수를 나타낸다.
주의할 점은 인수의 개수가 아닌, 함수를 정의했을 때의 매개변수의 개수를 나타내는 프로퍼티 값을 가리킨다.

name 프로퍼티는 함수 자신의 이름을 나타냅니다.
ES6부터 표준이 되었기 때문에 동작이 다를 수 있는데,
ES5에서는 익명함수의 name은 ''(빈 문자열)인 반면,
ES6에서 익명함수의 이름은 할당된 식별자 (변수) 이름을 값으로 갖습니다.

반면, 기명함수에서는 할당된 식별자가 아닌, 함수명을 가리킵니다.

마지막으로 prototype 프로퍼티는 생성자 함수로 호출할 수 있는 함수 객체만 지닌 프로퍼티입니다.
따라서 화살표 함수나 메서드 축약 표현, 일반 객체는 생성자 함수로 호출할 수 없는 함수 객체이므로
prototype 프로퍼티가 없습니다.
```

</details>

## 💭 TMI

> console.log 이나 .error 등에 대해서는 알고 있었는데 .dir이 있다는 건 처음 알게 되었다. <br/>
> 실제로는 언제 쓰일 지에 대해서는 잘모르겠지만 객체의 프로퍼티를 콘솔로 찍어서 확인하고 싶을 때 쓰이는 상황에 활용해봐야겠다. <br/>
> rest 파라미터의 도입 배경에 대해 살짝 맛볼 수 있었던 거 같다. <br/>
> arguments가 유사배열이므로, 배열과 같이 순회는 가능하나, 배열 객체의 프로토타입을 상속한 건 아니다.<br/>
> Array.prototype.apply 와 같은 방식으로 접근하는 번거로움을, rest 파라미터를 통해 매개변수를 배열로 전달받아서, 간단히 배열의 프로퍼티를 사용할 수 있게 된 것이다.
