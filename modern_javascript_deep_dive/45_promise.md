# 45장 프로미스

<details>

<summary> 1. 콜백 헬이란? </summary>

```
비동기적으로 동작하는 함수에서, 콜백함수를 통해 처리 결과에 대한 후속 처리를 수행하는 비동기 함수가 비동기 처리 결과를 가지고 또다시 비동기 함수를 호출해서 콜백 함수가 중첩되어 복잡도가 높아지는 현상입니다.

예를 들몀 아래와 같은 상황입니다.

const get = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.send();

    xhr.onload = () => {
        if(xhr.status === 200){
            // 서버의 응답을 콜백 함수에 전다랗면서 호출히여 응답ㄷ에 대한 후속 처리 담당
            callback(JSON.parse(xhr.response));
        } else {
            console.error(`${xhr.status} ${xhr.statusText}`)
        }
    };
};

const url = 'https://jsonplaceholder.typicode.com';

get(`${url}/posts/1`,({userId}=>{
    console.log(userId); // 1
    get(`${url}/users/${userId}`,userInfo =>{
        console.log(userInfo); // {id:1,name:'hehe',username:'Haha',...}
    })
}))

위의 경우 2번만 중첩되어도 복잡하게 느껴집니다.

get('/step1',a => {
    get('/step2/${a}',b => {
        get('/step3/${b}',c => {
            get('/step4/${c}',d => {
                console.log(d);
            })
        })
    })
});

위와 같이 콜백을 사용하는 이유는
비동기 함수 처리 결과를 외부에 반환할 수 없고, 상위 스코프의 변수에 할당할 수도 없기 때문입니다.
비동기 함수의 처리결과에 대한 후속 처리를 하기 위해 비동기 함수 내부에서 콜백함수를 전달하게 되고, 이전 처리 결과를 갖고 어떤 처리를 해주기 위해 전달하다보니 콜백헬이 만들어집니다.

```

</details>

<details>

<summary> 2. 비동기 처리를 위한 콜백 패턴의 문제점? </summary>

```
비동기 함수의 후속 처리를 위해 콜백 패턴을 활용하면
콜백이 중첩되어 복잡도가 올라가는 콜백헬 문제가 있습니다.
또한, 콜백 패턴을 사용하면 에러 처리에 한계가 있습니다.

예를 들어 아래와 같이 에러처리를 하기 위해 try catch문으로 감싸주는 예에서 에러가 캐치되지 않습니다.

try {
    setTimeout(()=>{throw new Error('error!')},1000);
} catch(e){
    console.error(e);
}

비동기 함수인 setTimeout을 호출하면 setTimeout의 실행 컨텍스트가 실행되어 콜스택에 푸시되어 실행됩니다.
비동기 함수이므로 콜백함수가 호출되는 것을 기다리지 않고
바로 실행 컨텍스트에서 (콜스택에서 팝) 제거됩니다.
타이머가 만료되면 setTimeout함수의 콜백함수는 태스크 큐로 푸시되고 콜스택이 비어 있을 때 이벤트 루프에 의해 콜스택으로 푸시되어 실행됩니다.

에러는 호출자 방향으로 전파되는데, setTimeout 함수는
콜백함수를 실행할 때 이미 콜 스택에서 제거된 상태이며,
이는 콜백함수의 호출자가 아니라는 뜻입니다.
따라서 setTimeout 함수의 콜백함수가 발생시킨 에러는 catch 블록에서 캐치되지 않는다는 문제가 있습니다.

```

</details>

<details>

<summary> 3. 프로미스란? </summary>

```
프로미스는 비동기 함수의 후속 처리를 관리하는 객체입니다.
프로미스 인수는 두개 전달할 수 있는데,
첫번째는 resolve로, 비동기 처리를 성공한 경우 호출되고 프로미스를 fulfilled 상태로 변경합니다.
두번째로는 reject로ㅡ 비동기 처리에 실해판 경우 호출되며 프로미스 상태를 rejected로 변경합니다.

예를 들어, 다음과 같이 프로미스를 생성할 수 있습니다.

const promise = new Promise((resolve,reject)=>{
    if(/*비동기 처리 성공했을 경우*/) resolve('result');
    else reject('failure reason');
})

프로미스 비동기 처리 상태가 변화하면 후속처리 메서드에 인수로 전달할 콜백 함수를 선택적으로 호출할 수 있습니다.

const resolve_promise = new Promise((resolve)=>{
    resolve('result');
}).then((v)=>console.log(v),(e) => console.log(e));

const reject_promise = new Promise((_,reject)=>{
    reject(new Error('rejected'));
}).then((v)=>console.log(v),(e) => console.log(e));

콜백 패턴은 비동기 함수의 에러처리가 곤란하지만, 프로미스를 활용하면
에러를 문제없이 처리할 수 있습니다.

then의 두번째 인자로 에러를 처리하거나,

reject_promise.then((v)=>console.log(v),(e) => console.log(e));

프로미스의 후속 처리 메서드 catch를 활용해서 처리할 수 있습니다.
reject_promise.then((v)=>console.log(v)).catch((e) => console.error(e));

위의 경우 아래와 같이 처리됩니다.

reject_promise.then((v)=>console.log(v)).then((undefined, e) => console.error(e));

then의 두번쨰 인자로 에러를 처리하는 방식은 첫번째 인수에서 발생하는
에러를 처리하지 못하므로 catch를 통해 비동기 처리에서 발생한 에러뿐만
아니라 then 메서드 내부에서 발생한 에러까지 해결할 수 있기 때문에 catch 메서드의 사용이 더 권장됩니다.

프로미스는 프로미스 체이닝을 활용해 후속 처리 메서드에서 반환한
프로미스를 얀속적으로 호출할 수 있습니다.
프로미스 체이닝을 통해 비동기 처리 결과를 전달받아 후속 처리를 하기 때문에 콜백헬에서 발생하는 복잡한 콜백은 피할 수 있습니다.
하지만 프로미스도 콜백패턴을 활용하므로 콜백 함수를 사용합니다.

콜백 패턴은 가독성이 좋지 않으므로 async/await를 활용하면 이를 개선할 수 있습니다.

```

</details>

```js
setTimeout(() => console.log(1), 0);

Promise.resolve()
  .then(() => console.log(2))
  .then(() => console.log(3));
```

<details>

<summary> 4. 위의 실행 결과는 어떨까요? (ft. 마이크로 태스크 큐)  </summary>

```
위의 실행결과는 2 3 1 을 출력합니다.
이는 프로미스의 후속처리 함수는 태스큐가 아닌 마이크로 태스크큐에 저장되기 떄문입니다.

마이크로 태스크큐는 태스크큐와는 별도로 존재하는 큐로,
프로미스의 후속처리 함수가 일시적으로 저장되는 곳입니다.
타이머 함수나 이벤트 핸들러 등의 비동기 함수는 태스큐에 일시적으로 저장됩니다.

마이크로 태스크큐에 대기하고 있는 함수들의 우선순위가 더 높습니다.
이벤트 루프는 콜스택이 비어 있다면 마이크로 태스크큐를 먼저 확인해서
콜스택에 담아 실행을 합니다.
마이크로 태스크큐가 빈 상태가 되면 태스크큐를 확인하고 대기하고 있는 함수를 가져와 실행합니다.


```

</details>

<details>

<summary> 5. fetch? axios? </summary>

```
fetch는 XMLHTTPRequest와 객체와 같이 HTTP요청 전송 기능을 제공하는 클라이언트 사이드 Web API입니다.
HTTP응 담을 나타내는 Response객체를 래핑한 Promise 객체를 반환하면 then을 통해 프로미스가 resolve한
Response 객체를 전달받을 수 있습니다.

다만 fetch함수가 반환하는 프로미스는 404나 500과 같은 HTTP에러가 발생해도
에러를 reject하지 않고 불리언 타입 ok를 false로 설정한 Response 객체를 resolve 합니다.
요청이 완료되지 못한 경우에만 프로미스를 reject한다는 점에서 주의해야합니다.

fetch('https://non-existent-random.url.com')
.then(()=> console.log('ok'))  // ok 출력
.catch(()=> console.log('error'));

fetch('https://non-existent-random.url.com')
.then((response)=> {
  if(!response.ok) throw new Error(response.statusText);
  return response.json();
})  // ok 출력
.then((todo)=> console.log(todo))  // ok 출력
.catch((e)=> console.log(e));

반면, axios는 모든 HTTP 에러를 reject하는 프로미스를 반환하기 때문에 fetch와 같이 명시적으로 처리를 해줄 필요가 없다는 점에서 편리합니다.
또한 axios는 인터넵터, 요청 설정 등 fetch보다 다양한 기능을 지원한다는 장점이 있습니다.


```

</details>

## 💭 TMI

> 프로젝트를 했을 때, fetch를 통해 백엔드에 요청/응답을 했었는데, 백엔드 쪽에서 응답 방식을 변경했었다.<br/>
> 그러자 에러를 잘 잡았던 것이 reject되지 않는 상황이었는데, 알고보니 CORS에러와 같이 요청을 완료하지 못한 경우에만 <br/>
> 프로미스를 reject하는 거여서 그런거 였다. 😱<br/>
> response.statusText로 구분했었는데, 위의 예에서 그랬던 거처럼 response.ok확인하고 throw new Error를 해줬으면 됐구나. <br/>
> 반면 axio는 모든 HTTP 에러를 rejectg하는 프로미스를 반환했구나. 신기! 추가적으로 fetch/axios에 대해 찾아봐야겠다!
