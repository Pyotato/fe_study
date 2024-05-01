# 11 원시 값과 객체의 비교

<details>
<summary> 1. 객체(참조)와 원시 타입의 차이 3가지? </summary>

```
객체 타입과 원시 타입 데이터는
첫째, 객체 타입의 값은 변경 가능하지만 원시 타입의 값은 변경이 불가능하다는 점에서 차이가 납니다.
둘째, 값의 메모리 공간에서 저장되는 것이 다른데, 객체 타입의 값은 힙 메모리 공간에 값의 메모리 주소가 저장되는 반면, 원시 타입 데이터는 값 자체가 스택 메모리에 저장됩니다.
마지막으로 다른 변수에 해당 값을 할당해줬을 경우, 원시 타입 값은 값에 의한 전달, 즉 값을 복사한 새로운 값이 다른 변수에 할당되어, 서로가 값을 변경할 수 없는 반면, 객체 타입의 데이터를 다른 변수에 할당할 경우, 참조에 의한 전달이므로 각 변수가 참조하고 있는 값이 같은 객체 메모리이므로, 각 변수에서의 변경 사항이 참조하고 있는 객체에 반영됩니다.

```

</details>

<details>
<summary> 2. 값에 의한 전달과 참조에 의한 전달 차이  </summary>

```

값에 의한 전달(call by value)은 원시 데이터 타입을 다른 변수에 할당할 경우, 해당 데이터가 복사되어,
할당되어지는 변수는 이 복사한 값의 메모리를 참조하게 되고 두 변수는 서로 영향을 줄 수 없음을 나타내는 전달방식입니다.

반면, 참조에 의한 전달(call by reference)은 객체 타입 데이터를 다른 변수에 할당할 경우, 객체의 주소가 복사되어 해당 데이터의 주소를 두 변수 모두가 참조하게 되어, 각각 변수에서의 변경 사항이 객체를 변경하게 되는 전달 방식입니다.

이는 원시타입은 변경되니 않는 값이기 때문에 고정된 크기, 예를 들면, string은 길이*2바이트, number는 실수 정수 무관하게 8바이트로 저장되고, 타입에 따라 메모리에서 해당 크기만큼 읽어옵니다.
변수 let a = 3;이라고 선언과 할당을 할 경우, a는 원시 타입 데이터인 3이 할당된 메모리 주소를 가리키게 되며 8바이트로 읽어온 값인 3을 가리키게 됩니다.
반면 let b = {a:3, b:[1,2,'hi']};이라는 객체 타입 변수를 선언할 경우, let b또한 실행 컨텍스트 스택에 등록됩니다.
객체 리터럴 {}은 'a'를 키로 하고 값 3을 지닌 프로퍼티의 객체를 힙 영역에 생성합니다.
객체 타입 데이터는 크기가 동적으로 변하기 떄문에 스택과 같이 고정된 자료구조가 아닌 동적인 크기 할당이 가능한 힙에 데이터를 저장합니다. 변수 b는 힙 메모리에 있는 객체 {a:3, b:[1,2,'hi']}의 주소를 가리킵니다. b.a의 값은 원시 데이터 타입인 3의 스택에서의 주소를 가리키고, b.b는 배열(객체)의 힙에서의 메모리를 가리키게 됩니다.
만약 let x = a 라고 선언하고 할당을 하게 된다면, 실행 컨텍스트에서 x라는 변수를 등록하게 되고, a의 값인 3이 스택 메모리에서 새로운 주소로 복사되어, x는 이 새로 복사된 메모리의 3을 가리키게 됩니다.
따라서 x의 값을 다른 값으로 할당해도, 예를 들어 x=4라고 해도, x이 원래 가리키고 있던 메모리 주소가 새로운 스택 메모리에 새로 생긴 4의 주소를 가리킬 뿐, x=3이 있던 주소가 대체된 건 아닙니다.
이는 값에 의한 전달로, 결국 a 또한 x와 애초에 가리키고 있던 주소가 다르므로 서로의 값에 영향을 미칠 수 없습니다.
반면 let y = b; 라고 할 경우, b는 힙 메모리 상에서 있던  {a:3, b:[1,2,'hi']} 데이터의 주소를 가리키고 있으므로 y와 b는 같은 객체를 참조하고 있습니다. 이는 참조에 의한 전달이라 하며, y에서의 변경이 b와 같은 데이터 주소의 데이터를 변경하는 것이기 때문에 서로 영향을 미치게 되는 것입니다.

```

</details>

<details>

<summary> 3. 원시값이 '변경 불가능(immutable)'하다는 것과 객체값은 '변경가능(mutable)'하다는 것은 무슨 의미있가요?  </summary>

```
원시 타입 값은 메모리에 값 자체를 저장하고 변수는 이 값의 메모리 주소를 가리키게 됩니다.
만약 재할당을 하게 된다면, 변수는 새로운 메모리 공간의 메모리 주소를 참조하게 되어 원래 있던 값이 변경되는 것이 아닌 새로운 주소를 가리키게 되어 원래 값이 변경되지 않는 특징입니다.
예를 들어 let a =1; a++; 이라고 했을 경우 a의 값은 2가 됩니다. 변수 a의 값이 1에서 2로 변경된 것이 아니라, a에 할당되었던 1이라는 메모리 공간의 주소가 a+1 표현식이 평가되어 2라는 값을 생성하고 변수 a는 새로 생성된 이 값의 메모리 주소를 가리게 된 것입니다.

반면 객체 타입 데이터는 힙 영역의 데이터 주소값을 참조하고 있기 때문에, 변경사항은 해당 주소의 데이터에 접근하여 변경하는 것이므로 변경가능하다고 합니다.
예를 들어, let a = {x:1}; a.x = 2;라고 할 경우, a 변수는 객체 {x: 1};의 주소를 참조하게 됩니다. a.x는 원시 데이터 타입인 1의 주소를 가리키고 있지만, a.x = 2; 을 하게 되면 a.x의 주소를
2라는 주소로 변경하여, 같은 주소의 데이터가 다른 주소 공간으로 변경된 것입니다.
```

</details>

<details>

<summary> 4. let a = {x:1,y:[1,2,3]}; let b = a; let c = {x:1,y:[1,2,3]}; 에서 (1)a===b (🅾️ / ❎)  (2) b===c (🅾️ / ❎) (3) a.x === b.x (🅾️ / ❎) (4) a.y===b.y(🅾️ / ❎) (5) c.x =2를 하면 a와 b값이 변경되나요? b.y=2를 하면 a와 c의 값이 변경될까요? </summary>

```

(1) a === b  🅾️
(2) b === c  ❎
(3) a.x === b.x  🅾️
(4) b.y === c.y  ❎
(5) c는 a와 b가 참조하고 있는 객체의 주소와 다르므로 c의 값만 변경되고 a와b와는 무관하고 값에 영향을 미치지 않습니다. 하지만 b와 a는 같은 객체의 주소를 가리키므로 b의 값 변경은 a의 값은 변경합니다. 이제 a.y = 2이므 b.y = 2입니다. 하지만, c는 b와 a의 메모리 주소와 다른 메모리 주소를 참조하므로 값 변경과 무관합니다.

let a = {x:1,y:[1,2,3]}; let b = a; let c = {x:1,y:[1,2,3]};
에서 {x:1,y:[1,2,3]};는 객체이므로 참조에 의한 전달에 의해 b는 a와 같은 주소를 가르키게 되므로
(1)에서 a===b 는 같은 데이터 타입에 같은 주소를 가리키게 됩니다.
하지만, b와 c는 같은 데이터를 지녔지만 서로 다른 주소를 가리키게 되므로 다른 객체이며, false가 됩니다.
(3)에서 a.x와 b.x는 모두 1으로 원시 데이터 타입을 참조하므로 타입과 값 모두 동일합니다.
(4)에서 a.y와 b.y는 모두 a의 객체를 참조하고 있으므로 배열의 주소 또한 같은 주소를 참조하고 있습니다. 따라서 a.y===b.y입니다.

```

</details>

<details>

<summary> 5. call by value와 call by reference 에 대해 설명해주세요. </summary>

```

원시 타입 데이터는 call by value, 즉 함수로 전달받은 argument로 데이터의 값이 복사되어 함수로 전달되는 반면, call by reference는 객체가 argument로 전달되면 값의 주소값이 복사되어 전달 되는 것입니다. 하지만, 엄밀히 말하면 원시타입과 객체 타입모두 call by value 즉, 값에 의한 전달로 함수 argument에 전달됩니다. 원시타입의 변수는 스택 메모리 상에서 데이터 값 자체가 저장되어 있는 반면, 객체 타입의 변수는 힙 메모리에서의 객체의 메모리 주소가 저장되어 있기 때문에 모두 값이 전달되기 때문에, 모두 '값'의 전달이고 '데이터값', 그 자체냐 '주소값'이냐의 차이가 있을 뿐입니다.

원시타입의 데이터를 argument으로 넘기면 함수 안의 연산이 해당 변수를 변경하지 않습니다.
이는 argument에 전달된 것이 변수의 값이 복사되어 전달되어, argument의 값과는 독립된 메모리 공간이 할당된 변수입니다. 다음과 같이 에를 살펴보면

function changeStuff(num,otherNum,objA,objB,objC){
    num = num * 10;
    otherNum = {item: 'changed'};
    // console.log('otherNum',otherNum.item) // otherNum changed
    objA.item = 'changed';
    objB = {item: 'changed'};
    objC =3 ;
}

var num = 10;
var num2 = 2;
var obj1 = {item: 'unchanged'};
var obj2 = {item: 'unchanged'};
var obj3 = {item: 'unchanged'};

changeStuff(num,num2, obj1, obj2,obj3);

console.log(num); // 10
console.log(num2); // 2
console.log(obj1.item); // changed
console.log(obj2.item); // unchanged
console.log(obj3); // {item: 'unchanged'}

num 변수의 값은 원시 데이터로, changeStuff에서 argument로 전달되기 전 값이 복사되어 생성된 값이 전달됩니다. 3이라는 값이 stack 메모리에 새로이 생기고 이값에 대한 연산이 진행됩니다.
반면 obj1과 Obj2는 객체 타입 데이터입니다.
이 둘은 argument으로 전달될 때, 각각의 변수는 객체의 메모리 주소를 가리키게 되고,
두 객체의 주소가 각각 복사되어 함수의 parameter로 전달됩니다. 따라서, 주소가 복사되었을 뿐, 가르키는 객체는 원본 객체입니다.
objA은 마침표 프로퍼티 접근 연산자 (.)을 통해 복사되었던 주소의 객체(원본 객체 obj1)의 item 을 'changed'로 변경합니다.
반면에, objB는 복사되었던 객체의 주소에 새로운 객체로 교체합니다. obj2은 새로 생성한 객체의 주소가 할당됩니다.

만약 objB = 2; 와 같이 원시 값이 할당된다면 obj의 값은 변경되지 않습니다. 마찬가지로, 만약 num = {item: 'changed'}; 라고 해도 num의 값의 복사본이 재할당되므로 원본 num의 값과는 무관합니다.

따라서, 자바스크립트는 값에 의한 전달이라고 할 수 있습니다.

// pass by value (값에 의한 전달)

var num = 3;
console.log('num start', num);

function passByValue(func_num){ // 3이라는 새로 생성되었던 값을 전달받음
    console.log('func_num before re-allocating',func_num);
    func_num = 5; // 5라는 값으로 func_num 값을 덮어씀
    console.log('func_num after re-allocating',func_num);

}

passByValue(num);   // 전달하기 전 num 변수의 3이라는 값을 복사하여 새로이 생성된 값을 전달
console.log('num end: ', num);

// pass by reference (참조에 의한 전달)

var obj1 = {item: 'unchanged'};
console.log('obj1 start', obj1);

function passByReference(ref){
    console.log('ref before mutating',ref);
    ref.item = 'changed';   // de-reference 과정: 복사해서 넘겼던 주소를 참조하는 것이 아닌 헤당 메모리 주소에 가서 값 프로퍼티를 변경
    console.log('ref after mutating',ref);

}

passByReference(obj1);   // 전달하기 전 num 변수의 3이라는 값을 복사하여 새로이 생성된 값을 전달
console.log('obj1 end: ', obj1); // 변수 obj1는 가리키고 있으며 {item: 'unchanged'}의 주소를 전달

// pass by sharing (공유에 의한 전달)

var obj1 = {item: 'unchanged'};
console.log('obj1 start', obj1);

function passBySharing(ref){
    console.log('ref before mutating',ref);
    ref = {item:'changed'}; // 복사본의 주소의 데이터를 덮어씀
    console.log('ref after mutating',ref);

}

passByReference(obj1);   // 전달하기 전 num 변수의 3이라는 값을 복사하여 새로이 생성된 값을 전달
console.log('obj1 end: ', obj1); // 변수 obj1는 가리키고 있으며 {item: 'unchanged'}의 주소를 전달


즉, 전달 받은 객체는 완전히 de-reference할 방법이 없음

```

</details>
<details>

<summary> 6. [심화] v8 자바스크립트 엔진이 프로퍼티 접근 최적화하는 방식을 히든 클래스의 개념과 연관지어 설명해보세요.  </summary>

```

// 💖💖💖💖💖💖💖💖 v8 엔진의 히든 클래스를 통함 프로퍼티 검색 최적화: 해당 내용을 더 파보자! 💖💖💖💖💖💖💖💖

```

</details>

## 💭 TMI

> 저번 TMI를 적었을 때는 약간 불확실했던 부분들을 논리로 채워가는 부분이었다면, 이번에는 객체와 원시 타입의 개념에 대해, 그리고 왜 그러는 지에 대해 더 자세히 알 수 있는 시간이 되었던 거 같다.
