# 자바스크립트 내부 동작

> C와 같이 저레벨 언어들은 개발자가 메모리를 관리해줘야하는 특징이 있다. 어떤 값을 선언하면, 메모리공간을 할당하고 메모리에 접근해서 읽고 쓰는 과정부터, 해당 값이 더이상 필요가 없다면 직접 메모리를 해제하고 반환해야하는 작업을 거쳐야 한다. 이로 인해서 메모리 누수의 위험성이 있고, 개발자는 이를 잘 관리해야 하는 부담이 있다.
> <br/><br/>
> 반면, 자바스크립트는 고레벨 언어로, 개발자가 직접 메모리에 관여할 일이 없다. 변수에 할당되는 메모리는 자바스크립트 엔진이 알아서(?) 해준다. 
<br/> <h3>그럼 자바스크립트에서는 변수를 어떻게 관리(할당)하고, 가비지 컬렉팅은 어떤 과정을 통해 이루어지지? </h3>

## 가비지 컬렉션

- 가바지 컬렉션는  더 이상 참조가 되지 않은 메모리 공간을 해제하여 회수하는 자동화된 메모리 관리 방법 중 하나이다. 자바스크립트에서는 Root object에서 체이닝을 통해 해당 변수에 접근이 되는지 여부에 따라 가비지 컬렉팅을 진행한다. 즉, root object에서 해당 메모리를 참조하는 변수가 없다면 가비지 컬렉팅의 대상이라는 뜻이다.

- 메모리의 생활 주기 살펴보자.

![메모리의 라이프 사이클](https://github.com/Pyotato/fe_study/assets/102423086/655edab0-636c-41c6-8c9b-cc053dc5bf25) 

  - **메모리 할당** : 프로그램이 사용할 수 있는 메모리를 운영체제가 할당해준다. C와 같은 언어들은 명시적으로 (ex. malloc()) 이를 해야하지만, 자바스크립트에서는 알아서 해준다.
  - **메모리 사용** : 할당했던 변수를 사용하게 되면 할당해줬던 메모리에 대한 읽기/쓰기 등 연산이 진행된다.
  - **메모리 해제** : 필요없어진 메모리를 해제해줘서 다시 사용 가능하도록 해준다. 메모리를 명시적으로 할당해줬던 C와 같은 언어들은 해제해주는 과정 역시 명시적(free())으로 해줘야하는 반면, 자바스크립트에서는 알아서 가비지 컬렉터가 해준다.


|정적(Static) 할당|정적(Dynamic) 할당|
|:---|:---|
|- 컴파일 시 필요한 메모리 크기를 알아야한다.<br/> - 컴파일 시에 이루어진다.<br/> - 스택(stack)에 할당된다.<br/> - FILO (first-in-last-out,선입후출)|- 컴파일 시에 필요한 메모리 크기를 몰라도 된다. <br/> - 런타임 시에 이루어진다. <br/> - 힙(heap)에 할당된다. <br/> - 선언에 순서가 없다. |

- 코드를 컴파일하면, 컴파일러는 원시 데이터 타입(primitive data types: number,string, undefined, null boolean, symbol)의 값이 얼마나 메모리가 필요할 지 미리 살펴볼 수 있고, 필요한 메모리 공간을 `스택 영역`에 할당된다.

- 아래와 같이 원시타입의 변수를 선언하고, 값을 할당하면
  
```js
const num1 = 9;
const num2 = 100;
```

|Heap| 
|---|
||
||
||
||

|Stack|||
|---|----|---|
|메모리|주소||
|num2|000|100|
||001||
||002||
|num1|003|90|
||004||
||005||


- 참조 타입의 변수를 선언하고 값을 할당하면
  
```js
const obj1 = {val: 80};
const obj2 = {val: 90};
```
  
|Heap| |
|---|----|
|메모리|주소|
|020||
|021|80|
|022||
|023|90|
|024||


|Stack|||
|---|----|---|
|메모리|주소||
|obj2|000|023|
||001|
||002|
|obj1|003|021|
||004|
||005|


## Reference-counting garbage collection 

- ⚠️ 현대 자바스크립트 엔진은 더이상 쓰지 않음!
- 가비지 콜렉터는 값이 더 이상 필요없을 떄, 즉 쓰이지 않을 경우에 메모리를 회수한다고 한다. Reference-counting(참조 카운팅)은 결국 이 값이 더 이상 쓰이지 않을 경우를 체크해서 가비지 컬렉트의 대상 여부를 판단한다.
- 즉, 값(객체)이 계속 쓰이는 지를 구분하기 위해 참조하는 경우가 0일 때 가비지가 되고, 회수의 대상이 된다.
- 예를 들어,
  
  ```js
  let x = {      //  1
    a:{          // 2
      b:2,
    }
  }
  // 2개의 객체가 생성되었고, 2는 1의 속성으로 참조되고, 1은 변수 x에 할당되어 참조되므로 모두 gc 대상이 아니다.

  let y = x; //   y 라는 변수는 x의 객체를 참조한다.
  x = 1; //  객체를 참조하고 있던 변수 x는 이제 다른 값을 가리키게 되었으므로 y만이 생성되었던 객체를 참조한다.

  let z = y.a; // z 변수는 객체의 속성인 a에 참조하게 되었으므로, 객체는 이제 2개의 참조가 있다

  y = 'mozilla'; // 생성했던 객체는 이제 참조 카운트가 0이 되었으므로 가비지 콜렉트의 대상이 되었다. 하지만, z변수가 해당 객체의 a 속성을 참조하기 때문에 메모리 해제가 불가능하다.

  z = null;  // z변수가 더이상 객체의 a 속성을 참조하지 않아 해당 객체는 참조 카운트가 0이므로 가비지 콜렉트가 가능하다.
  ```

- 하지만 단순히 참조 카운트만 체크하는 방식은 순환참조 (circular reference)가 존재한다면 메모리 누수의 원인이 될수 있는 문제가 발생한다.
- 예를 들어,

  ```js
  function f(){ // 함수 내부에 객체 x,y가 있으므로 함수가 종료하면 가비지이므로 할당했던 메모리를 회수해야 한다. 
    const x = {};
    const y = {};
    x.a = y;  // x는 y를 참조하고
    y.a = x;  // y는 x를 참조한다
    // x와 y가 서로를 참조하기 때문에 둘 모두 참조 카운트를 감소하지 못해서 코드가 실행을 완료했어도 가비지 콜렉트의 대상이 되지 못한다.
    return 'azerty';
  }

  f();
  ```
> reference counting : 참조하는 대상이 하나라도 있으면 메모리 해제 못함. (서로를 참조하면 해제 불가)
> Mark and Sweep : 접근이 불가능하면 참조가 없는 것이므로 메모리 해제 가능함.

## Mark and Sweep 알고리즘 (현대 모든 엔진이 사용 중)

- 가비지 컬렉터는 값이 회수 대상인 지 여부를 가리키 위해 객체가 접근 가능한 지 Mark and Sweep 알고리즘를 활용한다.
- Mark and Sweep 알고리즘은 3 단계를 통해 이루어진다.
    1. Roots: 코드에서 참조하는 전역 객체를 roots라고 한다. 자바스크립트에서의 전역 객체는 `window`이고, Nodejs에서는 `global`이다. 가비지 컬렉터는 root에서부터 모든 자식들의 리스트를 지닌다.
    2. 가비지 컬렉터는 모든 루트들과 그 자식들을 살펴보면서 접근 가능하면 `active`, 접근 불가능하면 `garbage`라고 mark(표시)한다.
    3. `active`라고 mark되지 않은 메모리 부분들을 모두 해제하고 OS에게 돌려준다 (sweep).


<img src='https://media.licdn.com/dms/image/C4D12AQF34XdEbKTAbA/article-inline_image-shrink_1500_2232/0/1637438880605?e=1720051200&v=beta&t=AV_H5depP2iBUkRR8MhSPH-But846h17lzd91yt2vqo' alt='mark and sweep gif'/>



- 예를 들면
  
```js
function marry(man, woman){
  woman.husband = man;
  man.wife = woman;
  return {father:man, mother : woman};
}

let family = marry({name:'John'},{name:'Ann'});

//  family = null; 

```

- 위의 코드를 메모리 구조로 나타내면 아래와 같다.

![image](https://github.com/Pyotato/fe_study/assets/102423086/77c1193d-9eef-4e59-8cb7-e383341046c0)

- 위의 코드 주석을 해제하면, 메모리 구조는 다음과 같아진다.

![image](https://github.com/Pyotato/fe_study/assets/102423086/7e9007ad-c2cc-4380-b390-9c42baa8c981)

- John 과 Ann이 아직 서로를 참조하고 있다는 사실은 변함없지만, 상위의 family라는 객체가 root에서 참조되지 않기 때문에 더이상 접근 가능하지 않아 (garbage로 mark됨) 회수의 대상이 된다.


- 이전 `reference counting`에서의 순환 참조 문제도 `mark and sweep`에서는 문제가 되지 않는다.
  - 함수가 종료되는 시점에서는 더이상 함수 내부의 변수에 대한 참조가 없고, 전역 객체에서 이를 참조하지 않으므로 접근이 불가능해져서 메모리 해제의 대상이 된다.

> 🤔 얼마나 자주 가비지 컬렉트를 해야 성능에 문제가 없으면서 메모리를 효율적으로 쓸 수 있을까? <br/>
> 최적화 기법들: <br/>
> - `Generational collection` : generation(세대)가 거듭되어 오래 살아남은 객체를 덜 검사하는 방식. 객체가 생성되면 역할을 빠르게 처리하고 회수하는 과정을 반복하면, `새로운 객체`와 `오래된 객체`(과정을 반복하면서 소멸되지 않았던 객체)로 나뉘게 되는데, 이 오래된 객체를 덜 살펴보는 방식이다.
> - `Incremental collection`: 점진적으로 수집 증가(Incremental)하기. 한번에 너무 많은 객체를 mark를 하려면 시간이 많이 걸릴 수 밖에 없다. 엔진이 가비지 컬렉션을 조각으로 나누어서 하나씩 각각 처리하는 방식이다. 중간중간에 변화를 트래킹해야 하는 시간이 있어서 하나의 큰 작업을 처리하는 딜레이보다 짧고 잦은 딜레이가 발생할 수 있다.
> - `Idle-time collection`: CPU가 idle(한가)할 때에만 가비지 컬렉션이 진행되어 프로그램 실행에 영향을 최소화하려는 방식이다.

## V8 엔진의 일반적인 가비지 컬렉션

- v8 개발자에 의하면, 대부분의 프로그램 내의 객체들은 수명이 짧다고 한다. 즉, 다수의 객체들이 가비지 컬렉션의 대상이 된다는 점이다.
- 이 특징을 이용하여 V8 엔진은 heap을 두가지 generation(세대)로 나눈다.
- 객체들은 1~8MB크기 정도의 상대적으로 작은 공간인 new-space에 할당된다.
   - 이 공간에 할당되는 건 새로운 객체를 위한 공간을 예약하고 싶을 때 증가시켜줄 `Allocation pointer`만 두기 떄문에 자원을 많이 할애할 필요가 없다.
   - Allocation pointer가 이 new space의 끝에 도달하게 된다면 `scavenge(작은 규모의 가비지 콜렉션 사이클)`이 발동되고, 불필요한 객체들을 new space에서 재빠르게 제거한다.
   - scavenge 과정을 두번 생존한 객체들은 `old-space`로 옮겨진다.
- `Old-space`의 객체들은 `mark-sweep(대규모 가비지 컬렉션 사이클)`이 있을 떄 회수된다.
   - 대규모 가비지 컬렉션은 scavenge에 비해 덜 이루어지는데, 특정 규모의 메모리가 old space를 위해 쓰이게 된다면 발동된다.
   - 이 규모는 old space의 크기와 프로그램의 동작에 따라 가변적이다.

## 메모리 관리를 도와주는 자료구조들

- 자바스크립트는 가비지 콜렉션을 제어하는 방식에 대한 직접적인 api는 제공하지 않지만, 자료구조를 통해 간접적으로 가비지 컬렉션이 어떻게  메모리 관리되는 지를 관찰할 수 있다.

- [WeakMaps 와 WeakSets](#)

## references

- [javascrip internals(GC, MEMORY MANAGEMENT)](https://www.linkedin.com/pulse/javascript-internals-gc-memory-management-zubair-altaf/)
- [mozilla: Memory_management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management#data_structures_aiding_memory_management)
