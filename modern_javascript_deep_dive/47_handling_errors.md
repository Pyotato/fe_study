# 47장 에러 처리

<details>

<summary> 1. 에러 처리 방식들</summary>

```
단축평가나 옵셔널 체이닝 연산자를 활용해서 에러를 체크하거나, try-catch문을 활용하거나, try-catch문에서 Error 객체를 생성해서 throw해서 처리할 수도 있습니다.

예를 들어,

const $button = document.querySelector('button');

if($button?.classList.add('disabled')){
    // 옵셔널 체이닝 연산자를 통해 undefined이어도 프로그램이 강제 종료되지 않습니다.
}

try{
   $button.classList.add('disabled');
   if(!$button) throw new Error('something went wrong..');
}catch(e){
    console.error(e);
}

```

</details>

<details>

<summary> 2. 에러의 전파는 뭔가요?</summary>

```
에러가 발생하면 에러는 호출자 방향, 실행 중인 실행 컨텍스트가
푸시되기 직전의 실행 컨텍스트 방향으로 전파됩니다.

예를 들어,

const foo = ()=>{
    throw Error('foo에서 발생한 에러');
}
const boo = ()=>{
    foo();
}
const zoo = ()=>{
    boo();
}

try {
    zoo();
}catch(e){
 console.error(e); // foo에서 발생한 에러
}

호출한 zoo는 boo의 호출자이며, boo는 foo의 호출자입니다.
foo에서 발생한 에러는 catch되지 않았으므로, 호출자 방향 (boo)로 전파되고, boo에서도 에러를 캐치하지 않아 zoo를 걸쳐, 전역의 catch에서 에러를 핸들링합니다.

다만, 비동기 함수의 콜백함수들은 마이크로 태스크 큐나 태스크 큐에
일시 대기하다가 콜스택이 비면 이벤트 루프에 의해 콜스택에 푸시되므로
전파할 호출자가 존재하지 않다는 점을 주의해야 합니다.
```

</details>

## 💭 TMI

> 이전에는 if문으로 단축평가 혹은 옵셔널 체이닝 연산자를 주로 써서 조건부적으로 처리했었는데 <br/>
> 에러가 발생할 수 있는 곳은 적절히 try catch를 더 써봐야겠다.
