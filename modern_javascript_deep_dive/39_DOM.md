# 39장 DOM

```html
<div class="greeting">Hello</div>
```

<details>

<summary> 1. 위의 코드에서 각각 DOM의 어떤 노드로 이루어지나요?</summary>

```
div은 요소 노드, class='greeting'는 attribute 노드, Hello는 텍스트 노드입니다.
```

</details>

<details>

<summary> 2. 중요한 노드 타입 4개에 어떤 것들이 있고, 각각의 특징은?</summary>

```
DOM은 노드 객체의 계층구조로 이루어져 이루어져 있는데,
그 종류 중 document node, element node,atribute node, text node가 중요합니다.

document node는 DOM트리 최상위에 존재하는 루트노드로서 document 객체를 가리킵니다.
document 객체는 window의 document 프로퍼티에 바인딩되어 있으며
DOM 트리 노드들에 접근하기 위해 문서 노드로 진입해야므로 전역에서 접근 가능합니다.

element node는 HTML요소를 가리키는 객체입니다.
li, div, section 등, element으로 부자관계를 구성할 때 element node로 구조를 나타냅니다.

attribute node는 HTML 요소의 attribute를 나타내는 객체입니다.
attribute node는 각 element node와 연결되어 있습니다.
다만, attribute node는 element node와 부모를 공유하는 형제 노드가 아니므로,
node의 attribute에 접근하기 위해서는 해당 element node를 참조해야합니다.

text node는 HTML 요소의 텍스트를 나타내는 객체입니다.
문서의 내용을 표현하는 노드로, 노드의 최하단에 있는 리프에 해당되는 노드입니다.

노드 종류로 구분짓는다면
<div class='wrap'>
  <div class='greeting'>Hello</div>
  <div id='me'>I'm pyotato</div>
</div>

                --------
                document
                --------
                   |
                   |
                --------
                 element
                --------
                   |
   ----------------|-----------------------
   |                                      |
   |                                      |
-------      -------------------        -------      ------------------
element -----     attribute             element -----   attribute
-------      -------------------        -------      ------------------
| div |       class = 'greeting'        | div |         id = 'me'
-------      -------------------        -------       -----------------
   |                                       |
-------                                 ------------
  text                                      text
-------                                 ------------
 Hello                                   I'm pyotato
-------                                 ------------

```

</details>

<details>

<summary> 3. HTMLCollection과 NodeList 객체의 특징은?</summary>

```
HTMLCollection과 NodeList 모두 DOM 컬렉션 객체이며 이터러블이기 때문에
for...of문으로 순회하거나 스프레드 문법을 쓸 수 있습니다.
HTMLCollection은 실시간으로 상태를 반영하는 살아있는 객체입니다.
NodeList는 과거 정적 상태를 나타내는 non-live 객체로 동작하지만,
ChildNodes 프로퍼티가 반환하는 NodeList의 경우 HTMLCollection처럼 실시간으로 노드 객체의 상태변경을 반영합니다.

이러한 상태변경된 상태를 반영한 노드 정보를 변경할 경우, 예상치 않은 방향으로 동작할 수도 있습니다.
예를 들어,

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <ul id='dogs'>
      <li id='golden-retriever' class='red'>Golden Retriever</li>
      <li id='corgi' class='red'>Corgi</li>
      <li id='border-collie' class='red'>Border Collie</li>
    </ul>
</body>
    <script>
      const $redElem = document.getElementByClassName('red');
      console.log($redElem);
      for(let i = 0; i < #redElem.length; i++){
        $redElem[i].className = 'blue';
      }
      console.log($redElem);
    </script>
</html>

위의 경우, className은 순서대로 blue red blue가 됩니다.
왜냐하면 for문으로 돌면서 실시간으로 className이 변경되기 때문입니다.

i=0일 경우,
  <li id='golden-retriever' class='blue'>Golden Retriever</li> <!---!!!i=0에서 변경!!!--->
  <li id='corgi' class='red'>Corgi</li>
  <li id='border-collie' class='red'>Border Collie</li>

다음 i=1일 경우, id='golden-retriever' 는 해당 className에 해당되지 않으므로

  <li id='golden-retriever' class='blue'>Golden Retriever</li> <!---!!!i=0에서 변경!!!--->
  <li id='corgi' class='red'>Corgi</li>
  <li id='border-collie' class='red'>Border Collie</li>

에서 인덱스 1에 있는 값이 변경되어 아래와 같아집니다.
  <li id='golden-retriever' class='blue'>Golden Retriever</li> <!---!!!i=0에서 변경!!!--->
  <li id='corgi' class='red'>Corgi</li>
  <li id='border-collie' class='blue'>Border Collie</li> <!---!!!i=1에서 변경!!!--->

i=2일 경우, i < #redElem.length의 조건에 벗어나므로 종료합니다.
  <li id='golden-retriever' class='blue'>Golden Retriever</li> <!---!!!i=0에서 변경!!!--->
  <li id='corgi' class='red'>Corgi</li>
  <li id='border-collie' class='blue'>Border Collie</li> <!---!!!i=1에서 변경!!!--->

이처럼, 실시간으로 노드의 상태를 반영하여 예상치 않은 동작을 할 수 있으므로, 배열로 변환하여 사용하는 것이 안전합니다.

예를 들어, 아래와 같이 변경할 수 있습니다.
  const $dogs = document.getElementById('dogs');
  const {childNodes} = $dogs;
  [...childNodes].forEach((cn)=> cn.className = 'blue');
```

</details>

<details>

<summary> 4. innerHTML을 사용할 경우 단점?</summary>

```
innerHTML는 HTML 노드의 마크업을 직접 취득하거나 변경할 수 있습니다.
이때 element node의 프로퍼티에 할당한 HTML 마크업이 렌더링 엔진에 의해 파싱되기 때문에
Cross-Site Scripting Attack (크로스 사이트 스크립팅 공격)에 취약합니다.

HTML5에서는 innerHTML 프로퍼티로 삽입된 script 요소 내의 자바스크립트 코드를 실행하지 않도록 하지만,
onError 에러 이벤트를 강제로 발생시켜 자바스크립트 코드가 실행되도록 할 수 있습니다.

따라서 보안의 측면에서 innerHTML을 사용하면 안됩니다.
뿐만 아니라, innerHTML을 사용하면 element node의 모든 자식 노드를 제거한 뒤에
할당한 HTML 마크업 문자열을 파싱하여 DOM을 변경한다는 점에서 효율적이지 않습니다.
```

</details>

<details>

<summary> 5. HTML attribute와 DOM 프로퍼티는 같은 값을 관리한다. (🅾️ / ❎)</summary>

```
❎
DOM 프로퍼티는 HTML attribute의 초기값을 갖고 있는 반면, DOM 프로퍼티는 동적으로 변경사항이 반영된 정보를 담고 있습니다.
예를 들어 <input type='text' value=''/>와 같은 입력값을 받는 태그가 있을 경우,
처음에 DOM 프로퍼티와 HTML attribute은 value=''로 동일합니다.
하지만 입력창에 'hello'를 엽력하면 DOM 프로퍼티는 value='hello'로 변경되지만,
HTML attribute는 value=''로 변경되지 않습니다.
HTML attribute는 새로고침 등을 통해 노드의 원래 값을 불러와야할 때 등을 위한 초기 상태 정보를 기억하는 역할을,
DOM 프로퍼티는 노드의 최신 상태 정보를 담고 있는 역할을 합니다.
```

</details>

## 💭 TMI

> 🤯 타입스크립트 프로젝트에서 리액트 컴포넌트의 타입을 HTMLXXX의 타입으로 정해주거나 상속하게끔했는데, <br/>
> 이 타입들은 어디서오고 어떻게 아나 싶었는데 노드 객체 타입에서 온 거였구나.
