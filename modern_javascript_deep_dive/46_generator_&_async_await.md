# 46장 제너레이터와 async/wait

<details>

<summary> 1. 제너레이터의 동작방식?</summary>

```
제너레이터는 일반함수와 달리 함수 실행의 제어권을 양도할 수 있고,
함수 호출자의 상태를 주고 받을 수 있으며, 함수를 호출하면 함수 실행 결과 값을 반환하는 것이 아니라 제너레이터 객체를 리턴합니다.

제너레이터 함수는 next 메서드와 yield 표현식을 통해 함수 호출자와
함수의 상태를 주고받을 수 있습니다.

function* getFunc(){
    const x = yield 1;
    const y = yield (x+10);
    const z = yield (y+20);
    console.log(x,y,z) // 10, 20, 30
    return x+y+z;
}

const generator = getFunc();

let res = generator.next(); // yield 1 를 value에 할당하고 done은 false, 첫번째 next 메서드로 호출된 제너레이터의 매개변수는 무시됩니다.

console.log(res); // {value: 1, done: false}

res = generator.next(10); // x에 할당되고 yield 된 값 20이 value에 할당된다

console.log(res); // {value: 20, done: false}

res = generator.next(20); // y에 인수 20이 할당되고 x+y = 10+20이므로 30이 리턴된다.

console.log(res); // {value: 40, done: true}

res = generator.next(30); // y에 인수 20이 할당되고 x+y = 10+20이므로 30이 리턴된다.

console.log(res); // {value: 600, done: true}
```

</details>

<details>

<summary> 2. async/await란? </summary>

```
async/await는 프로미스 기반의 비동기 처리를 동기 처리처럼 구햔힐 수 있게해줍니다.
await 는 async 함수 내부에서 사용해야 힙니다.
프로미스가 settled인 상태 (비동기 처리가 수행된 상태)가 될 떄까지 대기하다가 settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환합니다.

const fetch = require('node-fetch');

const getGithubUserName = async id => {
    const res = await fetch(`https://api.github.com/users/${id}`);
    const {name} = await res.json();
    console.log(name);
}

getGithubUserName('pyotato');

fetch(`https://api.github.com/users/${id}`)을 수행하고 반환한 프로미스가 settled 될때까지 대기했다가 settled 상태가 되면 resolve한 처리 결과가 res 변수에 할당됩니다.

async 함수는 프로미스를 반환하는 비동기함수이므로 내부의 await에서 호출자가 명시합니다. 따라서 async 내부에서 try catch문을 통해 에러를 처리할 수 있습니다.

const getGithubUserName = async id => {
    try{
        const res = await fetch(`https://api.github.com/users/${id}`);
        const {name} = await res.json();
        console.log(name);
    } catch (err){
        console.error(err);
    }
}

async 내부에서 catch문을 사용해 에러를 처리하지 않으면 발생한 에러를 reject하는 프로미스를 반환합니다.

getGithubUserName('pyotato').then(console.log).catch(console.error);

```

</details>

## 💭 TMI

> async/await 내부적으로 try-catch문으로 에러처리를 안하면 후속 메서드를 활용할 수 있구나 (새로운 지식+1)<br/>
> 제너레이터에 대해서 처음 접해봤는데, 실제로 언제 쓰일 지는 살펴봐야할듯!
