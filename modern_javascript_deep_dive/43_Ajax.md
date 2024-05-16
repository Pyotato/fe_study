# 43장 Ajax

<details>

<summary> 1. Ajax란? </summary>

![](https://www.w3schools.com/xml/ajax.gif)

```
Ajax(Asynchronous Javascript and XML)란 자바스크립트를 사용하여 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고,
서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 프로그래밍 방식입니다.
Ajax는 WebAPI인 XMLHttpRequest 객체를 기반으로 동작합니다.

예전 웹페이지는 서버로부터 새로 받은 html을 처음부터 전체를 다시 랜더링하는 방식으로 동작헀습니다.
이는 이전 웹페이지와 차이가 없어 변경할 필요가 없는 부분까지
전체 HTML을 서버로부터 매번 전송받아 불필요한 데이터 통신이 발생하고,
렌더링도 처음부터 다시해야해서 화면 깜빡임이 있고,
클라이언트와 서버 간의 통신이 동기적이기 때문에 서버로부터 응답이 있을 때까지 다음 처리가 블로킹되는 문제가 있었습니다.

Ajax의 등작으로 인해 이러한 문제들을 개선할 수 있게 되었습니다.
```

</details>

<details>

<summary> 2. XMLHttpRequest란? </summary>

```
자바스크립트를 통해 HTTP 요청을 전송하기 위해 사용하는 객체입니다.
HTTP 요청 전송과 HTTP 응답 수신을 위한 다양한 메서드와 프로퍼티가 있습니다.

HTTP 요청을 전송하기 위해서는

먼저 XMLHttpRequest 객체를 생성합니다.

const xhr = new XMLHttpRequest();

XMLHttpRequest.prototype.open 메서드로 HTTP요청을 초기화합니다.

xhr.open('GET','/users');

HTTP 요청 메서드는 클라이언트가ㅏ 서버에게 요청하는 종류와 목적을  알립니다. 요청 메서드에는 GET, POST, PUT, PATCH, DELETE가 있습니다.

필요에 따라 XMLHttpRequest.prototype.setRequestHeader 메서드로 특정 HTTP 요청의 헤더 값을 설정합니다.


xhr.setRequestHeader('content-type','application/json');

위의 경우 content-type 헤더는 보내는 데이터의 MIME 타입 정보를 표현합니다.


XMLHttpRequest.prototype.send 메서드로 HTTP 요청을 전송합니다.

xhr.send();

요청을 보낸 뒤, XMLHttpRequest의 이벤트 핸들러 프로퍼티로 서버가 보낸 응답을 처리할 수 있습니다.

xhr.onLoad = () => {
    if(xhr.status===200) console.log(JSON.parse(xhr.response));
    else console.error('Error', xhr.status, xhr.statusText);
}


```

</details>

<details>

<summary> 3. GET과 POST 요청의 차이? </summary>

```
GET요청과 POST요청은 쓰이는 목적, 전송 방식에 차이가 있습니다.
GET요청은 리소스를 취득할 때 주로 쓰이고, POST 요청은 리소스를 생성할 때 쓰입니다.
전송 방식에 있어서, GET 요청은 데이터를 URL의 일부분인 쿼리 문자열로 서버에 전송합니다.
POST 요청 메서드의 경우 데이터 페이로드를 request body에 담아 전송합니다. POST 요청일 경우, send 메서드에 매개변수로 직렬화된 객체 페이로드를 전달할 수 있습니다. 다만 GET요청일 경우 페이로드는 무시되고 null로 설정됩니다.

```

</details>

## 💭 TMI

>
