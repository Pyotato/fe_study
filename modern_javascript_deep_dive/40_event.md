# 40장 이벤트

<details>

<summary> 1. 이벤트 전파란?</summary>

```
이벤트 전파(event propagation)란, DOM 트리 상에 존재하는 DOM 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파되는 것을 말합니다.
예를 들어

<body>
    <p>버블링 캡쳐링 이벤트 <button>버튼</button></p>
</body>

document.body.addEventListener('click',()=>{
    console.log('Handler for body');
});

document.querySelector('p').addEventListener('click',()=>{
    console.log('Handler for paragraph');
});

document.querySelector('button').addEventListener('click',()=>{
    console.log('Handler for button');
});

<button>버튼</button> 를 클릭하면 클릭 이벤트가 발생합니다.
이 때 생성된 이벤트 객체는 이벤트를 발생시킨 DOM 요소인 이벤트 타깃을 중심으로 DOM 트리를 통해 전파됩니다.
전파 단계는 캡쳐링 단계, 타깃 단계, 버블링 단계로 구분될 수 있습니다.
캡쳐링 단계는 이벤트가 상위 요소에서 하위 요소 방향으로 전파하고,
타깃 단계에서는 이벤트가 이벤트 타깃에 도달하고,
버블링 단계에서는 이벤트가 하위 요소에서 상위 요소 방향으로 전파되는 것입니다.

p요소를 클릭하면
'Handler for paragraph'이 출력되고 p의 상위 요소인 body의 이벤트로 버블링되어 'Handler for body'가 출력됩니다.

반면에 button요소를 클릭하면 캡쳐링->타깃->버블링 단계에 따라서
body 요소는 버블링 단계의 이벤트만을 캐치하고 p요소는 캡쳐링 단계의 이벤트만 캐치합니다.
button 요소를 클릭하면 캡쳐링 단계를 캐치하는 p요소의 이벤트 핸들러가 호출되고,
그 후 버블링 단계의 이벤트를 캐치하는 body 요소의 이벤트 핸들러가 순차적으로 호출되어
'Handler for paragraph' -> 'Handler for button' -> 'Handler for body'
가 순차적으로 출력됩니다.

하지만 button 요소가 처리할 이벤트가, p 요소에 의해 영향을 받지 않도록 하고 싶을 수 있습니다.
즉, 하위 요소에서 발생하는 이벤트를 별도로 처리하고 싶을 수 있습니다.
이와 같이 이벤트 전파가 발생되는 걸 방지할 수 있는데, stopPropagation() 메서드를 활용할 수 있습니다.

document.querySelector('button').addEventListener('click',(e)=>{
    e.stopPropagation(); // 이벤트 전파 방지
    console.log('Handler for button');
});


```

</details>

<details>

<summary> 2. 이벤트 위임이란</summary>

```
이벤트 위임(event delegation)은 여러 개의 하위 DOM 요소에 각각 이벤트 핸들러를
등록하는 대신 하나의 상위 DOM 요소에 이벤트 핸들러를 등록하는 방법입니다.

예를 들어, 다음과 같이 li 요소를 클릭하면 해당 클래스에 'active'를 등록하는 코드를 이벤트 위임을 통해 여러 요소에 이벤트 핸들러를 추가하지 않아도 됩니다.

<ul id="fruits">
    <li class="active" id="apple">Apples</li>
    <li id="banana">Banana</li>
    <li id="orange">Orange</li>
</ul>

<div>선택 과일: <em class="msg">apple</em></div>

const $fruits = document.getElementById('fruits');
const $msg = document.querySelector('.msg');

function activate({target}){
    [...$fruits.children].forEach(($fruit)=>{
        $fruit.classList.toggle('active',$fruit === target);
        $msh.textContext = target.id;
    })
}

document.getElementById('apple').onclick = activate;
document.getElementById('banana').onclick = activate;
document.getElementById('orange').onclick = activate;

위의 코드에서는 이벤트를 발생시키고 싶은 모든 li에 이벤트를 등록해야하는 번거로움이 있습니다.

function activate({target}){
    if(!target.matches('#fruits > li')) return;
    [...$fruits.children].forEach(($fruit)=>{
        $fruit.classList.toggle('active',$fruit === target);
        $msh.textContext = target.id;
    });
}

$fruits.onclick = activate;

위의 코드처럼 상위 요소인 ul#fruits에 이벤트를 위임하여,
#fruits > li인 하위 자식이면 하위의 DOM요소에 발생한 이벤트를 처리할 수 있도록 할 수 있도록 했습니다.
```

</details>

## 💭 TMI

> 이벤트 전파(버블링)가 안좋은 거라고만 알고 있었지만, 필요(이벤트 위임)에 따라 적절히 사용하면 유용할 수도 있구나!
