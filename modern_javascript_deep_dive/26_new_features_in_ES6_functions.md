# 26장 ES6 함수의 추가 기능

<details>

<summary> 1. ES6에서 함수의 사용 목적에 따른 3가지로 구분은? </summary>

```
ES6 이전에는 함수를 호출 방식에 따라 동작이 달라질 수 있었습니다.
예를 들어, new 연산자와 함께 생성자 함수로 쓰일 수도 있었으며, 그냥 호출하여 일반함수로 쓰이거나,
객체의 매서드로써 호출할 수 있었습니다. 이는 혼란스럽고 실수를 유발할 수 있다는 점에서 ES6부터는
일반함수, 메서드, 화살표 함수로 사용 목적에 따라 구분지을 수 있습니다.
메서드와 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor 함수 입니다. 따라서, 메서드는 생성자함수로 호출할 수 없고 prototype 프로퍼티도 없습니다.
ES6 메서드는 자신을 바인딩한 객체를 가리키는 내부슬롯 [[HomeObject]]를 갖습니다.
super 참조는 이 내부 슬롯을 통해 수퍼 클래스의 메서드를 참조하므로 ES6의 메서드는 super 키워드를 쓸 수 있습니다.
반면, 화살표 함수는 일반함수와 달리 this,arguments, super, new.target 바인딩을 갖지 않습니다.
즉, 화살표 함수 내부의 this는 가장 근접한 외부 스코프 중에서 this 바인딩이 된 함수를 가르킵니다.
따라서, this 바인딩을 해결하기 위해 화살표 함수가 주로 쓰입니다.

예를들어,

class Dog{
  constructor(name,sound){
    this.name = name;
    this.sound = sound;
  }
  bark(time){
    return time.reduce((acc,curr,i)=>acc+`${curr} o'clock${i===time.length-1?'.':','} `,`${this.name} barks like ${this.sound} around `);
  }
  weirdBark(time){
     return time.reduce(function(acc,curr,i){
         if(i===0){
            return acc+=`${this.name} barks like ${this.sound} around `;
         }
         return acc+`${curr} o'clock${i===time.length-1?'.':','} `
     },'');
  }
}

const darcy = new Dog('darcy','bow wow');
console.log(darcy.bark([2,6,9])); // darcy barks like bow wow around 2 o'clock, 6 o'clock, 9 o'clock.
console.log(darcy.weirdBark([2,6,9])); // 에러!! undefined name, this가 reduce내부의 콜백함수 익명함수를 참조하기 때문

```

<table>
  <tr>
    <th>ES6 함수 구분</th>
    <th>constructor</th>
    <th>prototype</th>
    <th>super</th>
    <th>arguments</th>
  </tr>
  <tr>
    <td>일반함수 (Normal)</td>
    <td>O</td>
    <td>O</td>  
    <td>X</td>
    <td>O</td>
  </tr>
  <tr>
    <td>메서드 (Method)</td>
    <td>X</td>
    <td>X</td>
    <td>O</td>
    <td>O</td>
  </tr>
  <tr>
     <td>화살표 함수 (Arrow)</td>
   <td>X</td>
   <td>X</td>
    <td>X</td>
    <td>X</td>
  </tr>
</table>
</details>

<details>

<summary> 2. Rest 파라미터에 대해 알고 계시나요? 쓰이는 예시들을 보여주세요.</summary>

```
rest 파라미터는 ...을 활용해 전달받은 인수들의 목록을 배열로 전달받아, 나머지를 나타낼 때 유용합니다.
예를 들어

function printAlphas(a,b,c,...rest){
  console.log(a); // a
  console.log(b,c); // b c
  console.log(rest); // ['d', 'e', 'f', 'g']
}

printAlphas('a','b','c','d','e','f','g')
와 같이 매개변수의 개수가 여러개일 경우 쓰일 수 있으며, 반드시 1개만 사용가능하며, 인수의 맨 마지막에 위치해야 합니다.
```

</details>

<details>

<summary> 3. 매개변수에 기본값을 줄 수 있는데, 이에 대한 예시를 보여주세요.</summary>

```
rest 파라미터는 ...을 활용해 전달받은 인수들의 목록을 배열로 전달받아, 나머지를 나타낼 때 유용합니다.
예를 들어

function add(a,b=1){
  console.log(a+b);
}

add(1);

위의 경우에서 매개변수로 1개의 값만 전달할 경우, 기본값이 없다면 1+undefined이 되기 때문에 NaN이 되는 문제를 방지할 수 있습니다.
```

</details>

## 💭 TMI

> ...을 자주 썼었는데, 파라미터에 쓰일 때는 rest 파라미터라는 이름이 따로 있었구나 싶었다. 구조분해할당이랑 같은 건줄!<br/>
