# 0장 들어가며

<details>

<summary> 1. 왜 리액트를 사용하시나요? </summary>

```
리액트는 명시적인 상태변경과 단반향 바인딩을 지원합니다.
리액트는 Angular의 양방향 바인딩과 달리 상태 변화를 감지하고 업데이트하는 코드가 방대해질 수는 있지만,
컴포넌트 간의 데이터의 흐름이 한쪽으로만 가는 단방향 바인딩으로 인해,
상태 변화를 명시적으로 일으키는 함수만 찾으면 되므로 상태 변화를 추적하기 비교적 쉽고 버그를 야기할 가능성이 적습니다.

또한 리액트는 HTML에 자바스크립트 문법을 더한 JSX를 사용하기 때문에 JSX 고유의 특징 몇가지와
자바스크립트만 알고 있다면 JSX의 구현이 비교적 쉽습니다.
예를 들어, 조건부 렌더링을 할때 리액트는
{condition? <div>true content</div>:<div>false content</div>} 로 JSX는 {}로 감싸줘야한다는 것만 알고 있으면 구현 가능합니다.
반면 Angular는 뷰를 나타내기 위해 문자열 탬플릿을 사용하는데, ngIf와 같은 전용 문법을 익혀야 합니다.
<div *ngIf='condition'>true content</div>
따라서 초기 러닝커브가 비교적 낮다는 점에서 선택하게 됐습니다.

뿐만 아니라 리액트는 강력한 커뮤니티로부터 도움을 받기 쉽다는 점과
라이브러리로써 지닌 높은 자유도로 인해 다양한 시도가 가능하다는 점에서 사용하게 되었습니다.
```

</details>

<details>

<summary> 2. 리액트의 역사? </summary>

![](https://github.com/Pyotato/fe_study/assets/102423086/810ca415-f716-47fe-ae67-9b4de293a686)

```
리액트가 페이스북(현재 메타)에 의해 개발된 프론트엔드 라이브러리라는 것에서 리액트의 탄생은
당시 페이스북의 과제와 깊게 연관된 점을 유추할 수 있습니다.
2010년대에는 프론트엔드의 역할이 점차 확대되고 있었습니다.
제이쿼리를 통해 자바스크립트를 더 편리하게 쓸 수 있었고, 로컬스토리지가 등장하고, 웹소켓, Canvas, Geolocation, Ajax 등,
브라우저에서 지원하는 기능들도 많이 추가되었으먀, 복잡해지는 자바스크립트 코드를 체계화하고자
MVVM 패턴 기반의 Angularjs(구글)와 MVC 패턴 기반의 Backbone.js (Jeremy Ashkenas)가 등장했습니다.

위의 이미지는 당시 페이스북의 타임라인 페이지였습니다. 실시간으로 자신의 상태를 업로드하고,
실시간으로 다른 사람들의 댓글이 추가되는 것을 확인하는 등, 서버 사이드 렌더링으로 매번 처리될 때마다 화면 깜빡임이나 느려짐이 발생할 수 밖에 없었기 때문에 자바스크립트 의존도가 높아질 수 밖에 없었습니다.

페이스북의 다양한 요구사항을 처리하면서 만족스러운 유저 경험을 주기에는 Angularjs와 Backbone.js로는 어렵다는 판단에 BoltJS가 등장했습니다.
기존 BoltJS는 여러 라이브러리들과 함꼐 구축된 프레임워크에서, 함수형을 지원하는 Fbolt (Functional Bolt)가 등장하게 되었습니다.
Fbolt는 리액트의 시초가 됩니다. 애플리케이션에서 API변화가 발생하면 UI를 초기화하고 아예 새로 렌더링하는 접근법을 제시했습니다.
페이스북 게시물 하단에 있는 댓글와 공유버튼이 있는 화면인 UFI(Universal Feedback Interface)를 시작으로,
JSX구문과 Flux 패턴이 등장하게 되었으며, 인스타그램을 인수하면서 리액트로 웹 버젼을 만들었습니다.
BoltJS에서 방치되었던 오픈소스 프로젝트들에서 배웠던 것을 토대로 JSConf에서 첫공개를 했지만, 당시에는 HTML과 JS가 같은 파일에
존재하여 관심사 분리 원칙을 어기는 듯한 리액트의 구문(컴포넌트 기반의 관심사 분리)에 회의적인 반응이 주를 이뤘습니다.

하지만 리액트의 접근 방식에 흥미를 갖고 리액트를 도입하는 외부 개발자들이 조금씩 늘어나면서 커뮤니티가 형성되었고,
상태관리 라이브러리, 라우터 라이브러리, 서버사이드 렌더링 프레임워크 등이 등장하면서 리액트는 프론트엔드의 생태계에 자리잡게 되었습니다.

```

</details>

## 💭 TMI

> 👼 이번장은 리액트의 태생에 대해 알게 되었다.<br/>
> 나름 우여곡절이 많았고 현재의 모습은 커뮤니티의 힘으로 자리잡은 듯한 느낌!<br/>
> 리액트를 선택했던 당시에는 처음 코딩을 배웠던 때였고, HTML/CSS/JS와 지바만 조금 다룰 수 있었던 터라 빠르게 배워볼 수 있을 거 같은 리액트가 눈에 들어왔던 거 같다.<br/>
> (다만 뭐든 마스터링하는 과정은 어렵기 때문에 리액트도 진입장벽만 낮을 뿐..좋은 프롤그램을 만들기에는 배워야할 게 한참이다🥲)<br/>
> Angular를 써보지는 않았지만 예시코드들을 보면서 역시 리액트를 고르긴 잘 했어..
