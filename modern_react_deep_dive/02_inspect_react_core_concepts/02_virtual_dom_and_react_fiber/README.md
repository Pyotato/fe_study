# 가상돔과 리액트 파이버

> 📚 이번 장에서는 가상돔은 왜 만들어졌을까, 실제 돔과의 차이, 실제 돔 조작 속도와의 비교에 대해 살펴 보자!
> 🌟 KEY POINTS : 가상 돔이 뭔지, 실제 돔과 비교한 이점, 가상 돔 다룰 때 조심할 점!

<details>

<summary> 1. DOM이란? 브라우저 렌더링 과정이 어떻게 되나요?  </summary>

![](https://web.dev/static/articles/critical-rendering-path/render-tree-construction/image/dom-cssom-are-combined-8de5805b2061e_1920.png)

```
DOM (document object model)은 웹페이지의 콘텐츠와 구조를 어떻게 보여줄지에
대한 정보를 담고 있는 웹페이지에 대한 인터페이스입니다.

브라우저 렌더링 과정에 도달하기 위해서,

1. 먼저 브라우저는 사용자가 요청한 주소를 뱡몬해 HTML 파일을 다운로드합니다.

2. 그 후 렌더링 언진은 HTML을 파싱해 DOM 노드로 구성된 트리인 DOM 트리를 생성합니다.

3. DOM 트리를 생성 중에 CSS 스크립트 요청이 있다면 DOM 트리 생성을 중단하고,
CSS 파싱을 하여 CSS노드로 구성된 CSSSOM을 생성합니다.

4. 브라우저는 생성했던 DOM 트리 노드 중 화면에 보일 요소에 해당되는 노드들을 (즉, display:none과 같은 요소들은 방문하지 않음) 순회하면서 CSSOM을 바탕으로 스타일을 입히는 작업을 합니다.

이 과정에서는 두가지가 있습니다.

   1) 레이아웃(reflow/layout) : 노드들이 브라우저 화면의 어느 좌표에 있는 지
                              정확히 계산합니다. 이 과정이 있다면 반드시
                              페인팅 작업도 수반됩니다.
   2) 페이팅(painting/resterizing) : 레이아웃 이후 색상 정보 등을 반영하여 그려줍니다.


```

예를 들어보면 다음과 같은 과정을 통해 렌더링이 발생합니다.

```css
/** ./style.css 파일 */
#text {
  background-color: red;
  color: white;
}
```

``html

<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="./style.css"/>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Critial Path: Hello world!</title>
  </head>
  <body>
    <div style="width: 10%">
      <div id="text" style="width: 50%">Hello world!</div>
    </div>
  </body>
</html>
``

1. 2위의 HTML을 브라우저가 다운로드하여 분석합니다.
2. 스타일시트가 포함된 link 태그를 발견하고, style.css를 다운로드 하고 CSSOM을 생성합니다.
3. body 태그 하단의 div는 넓이가 50%이므로 뷰포트 기준 좌우 너비를 100%으로 잡습니다.
4. 그 아래의 div는 넓이가 50%이므로 상위 태그 기준으로 너비를 50%으로 잡습니다.
5. 눈에 보이는 요소들을 파악했으므로 2에서 생성했던 CSSOM 정보를 반영하는데, id='text'의 배경은 빨강, 폰트색은 흰색으로 입힙니다.

![출처: [web.dev](https://web.dev/static/articles/critical-rendering-path/render-tree-construction/image/calculating-layout-inform-93e78448ce474_1920.png)](https://web.dev/static/articles/critical-rendering-path/render-tree-construction/image/calculating-layout-inform-93e78448ce474_1920.png)

</details>

<details>

<summary> 2. 가상돔 만드는 과정 (ft. react fiber)</summary>

```
가상돔 생성과 렌더링 최적화를 담당하는 역할은 react fiber가 합니다.
react fiber란 리액트에서 파이버 재조정자(fiber reconciler)가 관리하는 객체입니다.

파이버 재조정자는 실제 돔과 가상돔 간의 변경 사항을 수집하고,
변경 사항을 갖고 있는 파이버를 기준으로 화면에 렌더링을 요청합니다.
재조정(reconcilation)이란 새롭게 렌더링 해줘야 할 가상돔과 실제 돔을 비교하는 알고리즘입니다.

파이버는 변경 사항을 반응성있게 대처하기 위해서는 비동기적으로
작업을 작은 단위로 분할하고 쪼갠 다음 우선 순위를 매길 수 있고,
작업들을 일시 중지하고 다시 시작할 수 있고,
이전 했던 작업을 재사용하거나 필요없는 작업을 페기할 수 있어야 헙니다.

과거 리액트의 조정 알고리즘은 스택 알고리즘을 활용했기 때문에
작업들이 동기적으로 이루어졌고, 하나의 작업을 처리해야만 다른 작업으로 넘어갈 수
있었기 때문에 비효율적이었습니다.

반면 파이버는 (??어떤 방식으로 해서 효율적으로 처리??)

파이버는 하나의 작업 단위로 구성돼어 있습니다.
하나의 작업 단위를 처리하면 finishedWork()라는 작업으로 마무리하고,
이 작업을 커밋해 실제 브라우저 DOM에 가시적인 변경 사항을 만듭니다.

렌더 단계에서 리액트는 사용자에게 노출되지 않는 비동기 작업을 수행합니다.
이 때 비동기적으로 우선순위를 지정하거나 중지시키거나 버리는 작업들을 합니다.

실제 변경 사항을 반영하는 단계인 커밋 단계에서는 돔에 commitWork()가 실행됩니다.
이 과정은 동기적으로 이루어지며 중단될 수 없습니다.

리액트 요소와 파이버가 유사한 거 같지만
리액트 요소는 렌더링이 발생할 때마다 새롭게 생성되는 반면,파이버는 가급적이면 재사용된다는 차이점이 있습니다.
따라서 컴포넌트가 최초로 마운트 되는 시점에 생성되고, 가급적이면 재사용됩니다.



```

![개발자 도구에서 요소의 속성 탭을 열어보면 FiberNode가 있다!](image.png)

</details>

## 💭 TMI

> debunking the myth...가상돔이 브라우저가 일반 돔을 관리하는 것보다 빠르진 않구나. 다만 애플리케이션이 돌아갈만큼 괜찮은 정도!
> 리액트 내부 코드에 작성돼 있는 파이버 객체(FiberNode)를 보니까, 진짜 일반적인 객체구나. 즉 리액트는 UI를 값으로 관리하는 역할을 해주고, 이런 값들을 활용해 dom 변경 관리를 하는 거.
> 00_intro에서 리액트는 state값이 변경되었는지 확인할 때 depth1까지만 비교한다고 했었는데, 재조정자가 작업하는 방식을 보면 모든 depth 확인하는 건 성능 이슈있을 듯해서 이해가 간다.
