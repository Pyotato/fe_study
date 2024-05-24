# 1장 리액트 개발을 위해 꼭 알아야 할 자바스크립트

<details>

<summary> 1. 자바스크립트 동등 비교 </summary>

```
🤔 리액트에서 동등비교를 알아야하는 이유는 뭘까요?
- 리액트의 컴포넌트의 렌더링이 발생하는 이유 중 하나는 프롭스의 동등비교에 의해서 발생합니다.
프롭스의 동등비교는 객체의 얕은 비교를 통해 이루어지는데 렌더링 최적화를 위해 알아야합니다.
리액트의 가상 돔과 실제 돔 비교, 리액트가 컴포넌트를 렌더링 할 지, 변수/함수의 메모이제이션 등은 모두 자바스크립트 동등비교를
통해 이루어집니다.
```

```
🤔 ||과 ??과 &&의 차이?
자바스크립트에서는 Boolean 뿐만 아니라 다른 값들도 true/false 한 값으로 취급되는 truthy/falsy 한값들이 있습니다.
대표적으로 falsy한 값에는 0,-0,NaN, 빈 문자열, null, undefined 등이 있고, truthy한 값으로는 {}, []이 있습니다.
따라서 코드를 짤 때 &&와 || , ?? 논리 연산을 사용할 떄 주의를 해야하며 되도록이면 삼항연산자를 활용하는 것이 더 안전합니다.

예를 들어, && 연산자는 왼쪽으로 오른쪽으로 피연산자들 값 중에 첫 falsy한 값을 리턴하고, 모든 값이 truthy하다면 맨 오른쪽 마지막 값을 리턴합니다.

value가 값이 있다면 'print true'가 나오도록 코드를 짜고 싶다면
console.log(value && 'print true'); 에서 value가 0이면 0은 falsy하므로 0이 출력 되는 문제가 발생할 수 있습니다. 대신, console.log(value ? 'print true':null);

|| 연산자는 피연산자들이 모두 불리언값이고 하나 이상의 true값이 있다면 true를 리턴하고, 피연산자들을 불리언 값이 아닐 경우, 왼쪽부터 오른쪽까지 첫 truthy한 값을 리턴합니다. 따라서 console.log(value || 'print true')에서 value가 0이면 0은 falsy한 값이므로 truthy한 비지 않은 문자열 'print true'이 리턴되는 반면,
console.log('print first true' || 'print true')에서는 'print first true'이 출력됩니다.

마지막으로 ?? 연산자는 두 피연산자 중 null이 아닌 값을 리턴합니다.
만약 두 피연산자 모두 null이 아니라면 왼쪽 피연산자를 리턴합니다.
```

```
🤔 리액트의 동등비교?

- 리액트는 Object.is로 먼저 비교를 수행하고, 객체 간의 얕은 비교를 한 번 더 수행합니다. 즉, 객체 간의 첫 깊이에 존재하는 값들만 비교합니다.
예를 들어, 아래와 같이 props 깊이가 깊어지면 React.memo는 컴포넌트에 실제
변경 사항이 없는데도 메모이제이션된 컴포넌트를 반환하지 못합니다.

type Props = {
    counter : number
}

const Component = memo((props:Props)=>{
    useEffect(()=>{
        console.log('Component has been rendered')
    })
    return <h1>{props.counter}</h1>
})

type DeeperProps = {
    counter : {
        counter: number
    }
}

const DeeperComponent = memo((props:DeeperProps)=>{
    useEffect(()=>{
        console.log('DeeperComponent has been rendered')
    })
    return <h1>{props.counter.counter}</h1>
})

export default function App(){
    const [,setCounter] = useState(0);

    function handleClick (){
        setCOunter((prev)=>prev+1)
    }

    return (<>
        <Component counter={100}/>
        <DeeperComponent counter={{counter:100}}/>
        <button onClick={handleClick}>+</button>
    </>)
}

```

</details>

<details>

<summary> 2. 함수 </summary>

```
함수란 작업을 수행하거나 연산 등을 하나의 블록으로 감싸서 실행 단위로 만들어 놓은 것입니다.

🤔 함수 선언 방식 4가지?
함수에는 함수 선언문, 함수 표현식, Function 생성자 함수, 화살표 함수가 있습니다.

- 함수 선언문 :

function add (a,b){
    return a+b;
}

- 함수 표현식:

const add = function(){
    return a+b;
}

- Function 생성자 함수

const add = new Function('a','b','return a+b');

- 화살표 함수:

const add = (a,b) => a+b;

함수 선언문과 표현식의 가장 큰 차이는 호이스팅 방식입니다.
호이스팅은 선언부가 코드 최상단으로 끌어올려지는 효과를 일컫습니다.
함수 선언문은 함수 호이스팅이 발생하는데, 선언부 뿐만 아니라 정의부분까지 모두
메모리에 미리 등록되어, 선언 위치와 무관하게 호출되어 실행할 수 있습니다.
반면 함수 표현식은 변수의 호이스팅처럼 동작합니다.
따라서 var 키워드로 정의한 함수 표현식은 undefined를, const/let은 TDZ에 빠져서
접근이 불가능하고 에러가 발생합니다.

화살표 함수와 다른 함수와의 가장 큰 차이는 this 바인딩입니다.
일반적인 함수 선언방식은 생성자 함수로 호출될 수 있습니다.
즉, new 연산자와 함께 인스턴스를 생성하기 위해 호출 될 수 있지만,
화살표 함수는 생성자 함수로 호출될 수 없다는 점에서 함수 내부에 constructor가 존재할 수 없으며,
this 또한 앞으로 생성될 객체(생성자 함수로 호출)나 함수 자기 자신(일반함수로 호출), 자신을 호출한 인스턴스(메서드로 호출)을 가리키지 않으며, 바로 위 스코프의 this를 가리키게 됩니다.

예를 들어,


class MyClass{

    constructor(me){
        this.me = me;
    }

    sayMe(){
        console.log(this)
        console.log(this.me+' says hi!');
    }

    static sayStaticMe(){
        console.log(this)
    }

    arrowSayMe = ()=> console.log(this.me+' says hi!');
}

const me = new MyClass('me');
// me.sayMe(); // me says hi!
// me.arrowSayMe(); // me says hi!
// me.sayStaticMe(); // 에러
MyClass.sayStaticMe(); // 정적 메서드는 인스턴스의 prototype이 아닌 MyClass애 버안딩 됨
```

</details>

<details>

<summary> 3. 클로저 </summary>

```
🤔 리액트를 잘 쓰기 위해서는 클로저에 대한 이유가 필수인 이유?
리액트의 클래스 컴포넌트를 이해하기 위해서는 자바스크립트의 클래스,프로토타입,this에 대해 알아야했습니다.
함수 컴포넌트의 구조와 작동 방식, 훅의 원리, 의존성 배열 등이 클로저와 밀접한 개념이기 때문에
함수 컴포넌트를 이해하기 위해서는 클로저를 알아합니다.

클로저는 함수와 선언된 lexical scope(어휘적 환경)의 조합이라는 mdn의 정의를 풀어보자면,
선언된 어휘적 환경은 변수가 코드 내부에서 선언된 위치의 환경이며,
조합은 이러한 변수가 선언된 유효한 범위를 활용해 코드를 짜는 것입니다.

리액트 함수 컴포넌트의 훅에서 클로저를 대표적으로 활용하고 잇는 것은 useState입니다.

예를 들어, 다음과 같이 useState 함수가 호출되어
state,setState에 구조분해할당이 되었고, 실행이 종료되었습니다.
하지만 setState는 useState 내부의 최신 값을 계속 확인할 수 있습니다.
외부 함수 useState가 반환한 내부 함수 setState는 선언적 환경 (state가 저장된 장소)를 기억하기
때문에 state값을 사용할 수 있습니다.

function Component(){
    const [state, setState] = useState();
    function handleClick(){

        setState((prev) => prev + 1)
    }
    // ..생략..
}

```

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
```

```
🤔 위의 코드는 어떻게 동작하나요?
위의 코드는 0부터 i가 증가할 때마다 i초에 i를 출력하는 것을 의도한 것과는 달리
5가 5초 뒤에 한번 출력됩니다.
이는 자바스크립트는 기본적으로 함수레벨 스코프를 따르기 때문에, var로 선언한
변수 i는 전역 변수로 작동합니다. 따라서 for문을 다 순회하고 태스크 큐의 setTimeout
은 i=5인 상태에서 출력합니다.

1초마다 0,1,2,3,4를 출력하게 하기 위해서는

1. 블록 레벨 스코프 변수 선언 키워드 let을 활용할 수 있습니다.

for(let i=0; i<5;i++){
    setTimeout(function(){
        console.log(i);
    }, i*1000)
}

2. 또는 클로저를 활용할 수 있습니다.

for(var i=0; i<5; i++){
    setTimeout(
        (function(sec){
        return function(){
            console.log(sec)
        }
    })(i),
        i*1000)
}

setTimeout의 콜백함수로 즉시 실행 함수를 선언했고,
인수로 넘긴 i는 함수마다 고유한 스코프와 sec을 가지기 때문에
각 스코프의 sec을 순차적으로 출력합니다.

```

</details>

<details>

<summary> 4. 이벤트 루프와 비동기 통신 </summary>

```
🤔 자바스크립트는 싱글쓰레드입니다. 즉, 동기적으로 일을 처리하기 때문에 하나의 작업이 끝나야 다음 작업을 처리할 수 있죠. 하지만 우리가 보고 있는 웹페이지에는 동시에 많은 일들이 발생하는 것 같습니다. 어떻게 가능할까요?

자바스크립트는 싱글쓰레드로, 직렬적/동기적으로 작업을 처리하지만,
웹브라우저는 태스크 큐와 이벤트루프를 활용해서 비동기적(병렬적)으로 작업을 처리할 수 있습니다.

함수가 호출되면 먼저 콜 스택에 쌓입니다. 함수 실행이 종료되면 해당 스택은 콜스택에서
제거되는 과정이 반복됩니다. 만약 setTimeout이나 ajax와 같은 비동기 함수가 호출되면
콜백함수는 태스크큐에 일시적으로 대기합니다.
이벤트 루프는 모든 함수가 실행되어 콜스택이 비어있다는 것을 확인하면 비로소 태스크큐에 있던 콜백함수를 콜스택에 쌓아 함수가 실행되고 실행 완료 후 팝됩니다.

예를 들어 동기적인 코드 실행을 살펴보자면,

function bar(){
    console.log('bar');
}

function baz(){
    console.log('baz');
}

function foo(){
    console.log('foo');
    bar();
    baz()
}

foo();

위의 실행 결과는 foo-bar-baz가 차례대로 출력됩니다.
먼저 호출된 foo()함수가 콜스택으로 들어갑니다.
그 후 foo 함수 내부의 console.log('foo')가 실행되고,
bar 함수가 호출되어 bar()함수가 콜스택으로 들어와 foo()함수 스택 위로 쌓입니다.
그 후 console.log('bar')가 실행되고, bar함수는 실행을 종료했으므로 콜스택에서 제거됩니다.
baz()함수가 호출되었으므로 bar함수가 그랬던 거와 같이 마찬가지로 콜스택에 쌓여
 console.log('baz') 실행 종료 후 팝됩니다. foo 함수가 모두 마쳤으므로 foo함수 또한 콜스택에서 팝됩니다.

 이렇게 콜스택의 비어 있음 여부를 체크하는 역할을 이벤트 루프가 담당합니다.
 이벤트 루프는 콜 스택에 수행해야할 작업들의 존재 유무를 체크하고 자바스크립트 엔진은 이를
 실행합니다. 즉, 단일 스레드에서 처리됩니다.

반면, 비동기적인 코드 실행을 살펴보자면,

function bar(){
    console.log('bar');
}

function baz(){
    console.log('baz');
}

function foo(){
    console.log('foo');
    setTimeout(bar(),0);
    baz();
}

foo();

위의 경우, setTimeout(bar(),0); 만 변경되었습니다.
하지만 실행 결과는 foo-baz-bar입니다.
여기서 0초 딜레이가 있기 때문에 바로 실행될 것이라는 기대와는 달리,
foo 함수가 호출되어 콜스택에 쌓이고 console.log('foo')가 실행된 이후,
setTimeout 타이머 함수가 호출 스택에 들어가며, 콜백함수로 넘긴 bar()는
태스크큐에 들어갑니다. 이후 콜스택에 팝되고, baz가 호출되면 console.log('baz')을 실행하고 팝됩니다. foo함수에 남은 것이 없으므로 콜스택에서 팝되고,
이벤트 루프는 콜스택이 비어있다는 것을 감지하고 태스크큐의 bar()함수를 콜스택으로 이동시킵니다.
bar()함수 내부의 console.log('bar')가 호출 스택에 들어가며 실행 종료 후 콜스택에서 팝됩니다.
여기서 비동기 함수의 수행은 메인 스레드가 아닌 태스크 큐가 할당되는 별도의 스레드에서 수행됩니다. 즉 브라우저나 nodejs에서 비동기 처리를 합니다.
```

```
🤔 태스크 큐와 마이크로 태스크 큐, 렌더링의 우선 순위?

Promise, process.nextTick, queueMicroTask, MutationObserver 등은
마이크로 태스크 큐에 들어가는 반면, 타이머 함수는 태스크 큐에 들어갑니다.
마이크로 태스크큐가 태스크 큐에 비해 우선 순위가 높기 때문에 먼저 처리됩니다.

예를 들어,

function foo(){
    console.log('foo');
}

function bar(){
    console.log('bar');
}

function baz(){
    console.log('baz');
}

setTimeout(foo, 0);

Promise.resolve().then(bar).then(baz);

위의 실행 결과는 bar-baz-foo 라는 점에서 태스크 큐보다는 마이크로 태스크큐가
우선 순위가 높다는 것을 볼 수 있습니다.
아래의 예를 통해서 렌더링은 마이크로 태스크 큐보다 우선순위가 낮고, 태스크 큐보다는 우선순위가 높다는 것을 알 수 있으며,
각 마이크로 태스크 큐가 실행하고 작업을 종료할 때 렌더링이 발생된다는 것을 알 수 있습니다.
즉, 브라우저 렌더링 작업은 마이크로 테스크 큐와 태스크 큐 사이에 발생합니다.

console.log('a');
setTimeout(()=>{
    console.log('b');
},0)
Promise.resolve().then(()=>{
    console.log('c');
});
window.requestAnimationFrame(()=>{
    console.log('d');
})

// a
// c
// b
// d

```

</details>

<details>

<summary> 5. 타입 스크립트 </summary>

```
🤔 효과적인 리액트 코드 작성을 위한 타입스크립트 활용법?

💖 any 대신 unknown 사용

any 타입은 타입스크립트가 제공하는 정적 타이핑을 모두 무효화시키기 때문에 대신 unknown 타입을 활용하고 type narrowing을 해주는 것이 좋습니다.

function foo(callback:unknown){
    if(typeof callback==='function){
        callback();
        return;
    }
    throw new Error('callback은 함수여야 합니다.')
}

💖 instanceof/ typeof / in 등을 이용해 타입 가드 적극적 활용

typeof 는 위와 같이 값의 데이터 타입을 확인하는데 사용할 수 있습니다.

instanceof 은 지정한 인스턴스가 특정 클래스의 인스턴스인지 확인할 때 쓸 수 있습니다.

class CustomError extends Error{
    constructor(){
        super();
    }
    get message(){
        return 'my custom error caught an error!'
    }
}

async function fetchSmt(){
    try{
        const res = await fetch('/api/random');
        return await res.json();
    } catch(e){
        if(e instance of CustomError){
            // do something...
        }

        throw e;
    }
}

in 연산자는 객체에 특정 키가 존재하는 지 확인하는데 쓰입니다.

interface Dog{
    name: string;
    bark: string;
}

interface Cat{
    name: string;
    meow: string;
}

function animal(animal:Dog|Cat){
    if('bark' in animal){
        animal.bark // animal은 Dog
        animal.name
    }
    if('meow' in animal){
        animal.meow // animal은 Car
        animal.name
    }
}

💖 제너릭 활용

제너릭은 함수나 클래스 내부에서 다양한 타입에 대응할 수 있도록 해줍니다.
예를 들어 useState에서 다음과 같이 활용할 수 있습니다.

const [state,setState]= useState<string>('');
state의 기본값을 넘기지 않을 경우 undefined가 될 수 있지만 제너릭으로 기본값을 선언해주면 이러한 문제를 해결할 수 있습니다.

뿐만 아니라 하나 이상을 사용할 수 있는데,

function multipleGen<First,Last>(a1:First,a2:Last):[First,Last]{
    return [a1,a2];
}

const [a,b] = multipleGen<string,boolean>('true',true);

💖 인덱스 시그니처

인덱스 시그니처는 객체의 키를 정의하는 방식입니다.

type Hello = {
    [key:string]:string // 키에 원하는 타입 부여
}

// Record<key, value>를 통해 객체의 타입에 원하는 키와 값을 넣얼 수 있습니다.
type Hello = Record<'hello'|'hi',string>


const hello:Hello = {
    hello : 'hello',
    hi : 'hi'
}

hello['hi'] // hi
hello['안녕'] // undefined


하지만 다음과 같은 경우 타입스크립트는 불평합니다.

Object.keys(hello).map((key)=>{
    const value = hello[key];
    return value;
})

이는 Object.keys(hello)의 반환 타입을 살펴보면 string[]입니다.
string은 인덱스 키로 접근할 수 없기 때문에 다음과 같이 해결할 수 있습니다.

(Object.keys(hello) as Array<keyof Hello>).map((key)=>{
    const value = hello[key];
    return value;
})

또는 Object.keys의 반환 타입을 강제하는 방식을 활용할 수 있습니다.

function keysOf<T extends Object>(obj: T):Array<keyof T>{
    return Array.from(Object.keys(obj) as Array<keyof T>);
}

keysof(hello).map((key)=>{
    const value = hello[key as keyof Hello];
    return value;
})

```

</details>

## 💭 TMI

> 모던 자바스크립트를 읽으면서 봤던 부분들도 있었고,<br/>
> 추가적으로 새로이 알게 되었던 내용들도 있어서 재미있었다!<br/>
> 뭔가 다 아는 내용이겠지~해서 빨리 읽을 줄 알았는데,<br/>
> 마이크로태스크큐로 프로미스말고도 다른 종류의 태스크들도 들어가는 걸 처음 알게 되었고,<br/>
> 태스크 '큐(Queue)'도 사실 '큐'가 아니라는 점!도 처음 알게 되었다.<br/>
> 게다가 제일 충격(?)적이었던 건 useState가 클로저를 활용했다는 것! 🤯<br/>
> 개념공부하면서 그래서 클로저를 실제로 어디에 쓰는데(?) 싶었는데 useState에서 쓰고 있었구나! 책을 읽으면서 내부동작에 대해서 좀 더 공부를 해봐야겠다!
> 이전 프로젝트에서 키를 동적으로 추가해야 했는데 타입스크립트가 계속 불평하길래 검색을 통해 어찌저찌 해결했는데 인덱스 시그니처를 활용했던 거였구나!
