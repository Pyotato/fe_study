# 41장 타이머

<details>

<summary> 1. 호출 스케줄링이란? </summary>

```
함수를 명시적으로 호출하면 함수는 즉시 실행됩니다.
호출 스케줄링은 명시적으로 호출하지 않고 함수가 일정 시간이 경과한 이후에 호출되도록 타이머 함수를 활용해 예약하는 것입니다.
```

</details>

<details>

<summary> 2. setTimeout과 setInterval 함수에 대해서 아시나요? 각각 사용 예를 들어 주세요. </summary>

```
setTimeout과 setInterval 함수 모두 타이머 함수입니다.
특정 밀리세컨드(ms) 후 실행할 콜백함수를 인자로 받아 함수 호출 스케줄링할 수 있습니다.

setTimeout는 두번째 인수로 받는 ms 초 후에 첫번째 인수인 콜백함수를 호출하는 것을 한번 실행하도록 합니다.
setInterval은 두번째 인수로 받는 ms 초만큼의 간격으로 첫번째 인수인 콜백함수를 실행하도록 합니다.
세번째 인수부터는 콜백함수에 매개변수를 전달할 수 있습니다.

setTimeout함수는 생성된 타이머를 식별할 수 있는 고유한 타이머 id를 반환합니다.
clearTimeout에 해당 id를 인수로 전달하면 호출 스케줄링을 취소할 수 있습니다.

예를 들어 아래의 경우 실행 순서는 launch  launch2  launch3  hi4  hi5 hi3  hi2 입니다.
console.log('launch');
let timerId =  setTimeout(()=>console.log('hi'),1000);
let timerId2 =  setTimeout(()=>console.log('hi2'),1000);
let timerId3 =  setTimeout(()=>console.log('hi3'),500);
let timerId4 =  setTimeout(()=>console.log('hi4'));
let timerId5 =  setTimeout(()=>console.log('hi5'),0);
console.log('launch2');
clearTimeout(timerId);
console.log('launch3');

timerId을 인수로 넘겨받은 타이머는 스케줄링이 취소되며,
launch  launch2  launch3 은 실행 흐름(위에서 아래로)에 맞게 바로 실행되는 함수입니다.
ms을 인수로 넘기는 것을 생략하면 즉시 실행 함수가 되며, 다음 사이클에 바로 실행되기 때문에 0을 매개변수로 한 timerId5도
실행 흐름에 따라 다음으로 실행됩니다.
timerId3 timerId2 순서대로 밀리초에 따라 호출이 스케줄링되어 실행됩니다.
setTimeout은 setInterval과는 달리 한번만 호출됩니다.

다음의 예는 아래의 함수는 1000초 간격으로 콘솔로 count가 5가 될때까지 출력하는 setInterval 함수입니다.
let count = 1;
const timeoutId = setInterval(()=>{
console.log(count);
if(count++ === 5) clearInterval(timeoutId);
},1000);
```

</details>

<details>

<summary> 3. debounce와 throttle에 대해 아시나요? 각각 차이가 뭔가요? </summary>

```
디바운스는 짧은 시간 간격으로 이벤트가 연속해서 발생하면 이벤트 핸들러를 호출하지 않고 일정 시간이 경과한 이후에
이벤트 핸들러가 한번만 호출되도록합니다.
반면에 쓰로틀은 짧은 시간 간격으로 이벤트가 연속해서 발생하더라도 일정 시간 간격으로 이벤트 핸들러가
최대 한번만 호출되록합니다.

예를 들어, 디바운스는 아래와 같이 간략하게 구현가능합니다.

const $input = document.querySelector('input');
const debounce = (callback, delay)=>{
  let timerId;
  return event => {
    // delay가 경과하기 이전에 이벤트가 발생하면 이전 타이머를 취소하고 타이머 재설정
    if(timerId) clearTimeout(timerId);
    timerId = setTimeout(callback,delay,event);
  }
}

$input.oninput = debounce((e) => console.log(e), 300);

디바운스는 resize 이벤트 처리, 입력 필드 자동완성, 버튼 중복 클릭 방지처리 등에 유용하게 쓰일 수있습니다.

쓰로틀은 아래와 같이 구현할 수 있습니다.

const $input = document.querySelector('input');
const throttle = (callback, delay)=>{
  let timerId;
  return event => {
    // delay가 경과하기 이전에 이벤트가 발생하면 이벤트 취소
    // 경과 후에는 타이머 재설정
    if(timerId) clearTimeout(timerId);
    timerId = setTimeout(()=>{
      callback(event);
      timer = null;
    }, delay, event);
  }
}

let throttleCound = 0;
$container.addEventListener('scroll',throttle(()=>{console.log(++throttleCount)},100))

쓰로틀은 무한 스크롤 등에 유용하게 쓰일 수 있습니다.

그림으로 함수호출과 딜레이,이벤트 발생을 나타내면

디바운스

🅴 🅴 🅴 🅴
->|
  ->|
     ->|
         |---딜레이-->|
                    함수 호출


쓰로톨

🅴 🅴 🅴 🅴 🅴 🅴 🅴 🅴 🅴 🅴 🅴
---딜레이-->|         |---딜레이-->|
           함수 호출            함수호출


다만, 위의 구현은 간략한 버전이므로 lodash 라이브러리를 활용하는 것이 좋습니다.

```

</details>

## 💭 TMI

> 음..쓰로톨과 디바운스는 아직 이해가 100%된 것 같지는 않다. 한번 내 말로 정리를 해보자면,
> 쓰로톨은 여러번 요청을 해도 경과 시간이 지나야지 한번 가능하게 하고,
> 디바운스는 여러번 요청을 해도 경과 시간동안 아무것도 안해야, 즉 쿨타임이 돌아야 함수 호출/실행
> 예를 들어 클릭을 여러번 했을 경우, 쓰로틀은 딜레이 시간이 경과할때마다 클릭한 결과가 1번 실행
> 디바운스는 클릭을 하고 난 뒤에 딜레이 시간만큼 클릭을 멈춰야 함수를 호출?
