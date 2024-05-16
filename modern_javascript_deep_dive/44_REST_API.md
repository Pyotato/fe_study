# 44장 REST API

<details>

<summary> 1. REST API 설계 원칙? </summary>

```
REST란 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍쳐이며, REST API는 REST를 기반으로 서비스 API를 구현한 것입니다.

RESTAPI는 자원, 행위, 표현으로 구성됩니다.
자원은 URI 엔드포인트로 표현되며,
행위는 HTTP 요청 메서드,
표현은 자원에 대한 구체적인 행위 내용에 해당되며, 페이로드로 나타낼 수 있습니다.

REST API의 주요 설계 원칙은 두 가지인데,
URI는 리소스를 표현하는데 집중해야하고,
HTTP요청 메서도는 행위에 대한 정의에 집중해야합니다.

예를 들어 todos의 1 을 가져오는 요청을 한다면

GET /getTodos/1 는 자원을 나타내는 uri에 get이라는 동사가 중복되어 표현되므로 restful하지 않습니다.
GET /todos/show/1 또한 show로 행위가 중복되어 있어 restful하지 않습니다.

GET /todos/1 와 같이 리소스를 식별할 수 있는 이름을 명사로 나타냈고, HTTP 요청 메서드로 리소스에 대한 행위를 나타냈으므로 적절합니다.

```

</details>

## 💭 TMI

> REST API에 대해 간단히 다룬 챕터같았다. 쉬운 것 같지만 찰떡인 이름 짓기 어려워..
