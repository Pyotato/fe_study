# DNS CNAME record

> DNS CNAME record는 하나의 IP주소를 사용하는 도메인 이름에 해당되는 가명(alias) 역할을 합니다.

## DNS CNAME record란?

"canonical name" (CNAME) record은 가명(alias) 도메인을 통해 "canonical" 도메인을 가리킵니다.
CNAME record는 [도메인](https://github.com/Pyotato/fe_study/blob/main/network/DNS/domain_name_vs_URL.md)이나 서브도메인이 다른 도메인의 가명으로 쓰일 때, [A record]() 대신에 쓰일 수 있습니다.
모든 CNAME 레코드들은 반드시 [IP주소]()가 아닌 도메인을 가리켜야 합니다. 보물 찾기를 하는데, 하나의 단서가 다른 단서를 가리키고, 그 단서는 또 다른 단서를 가리켜서, 마지막 단서가 보물이 있는 곳을 가리키는 상황을 생각해봅시다. 도메인이 있는 CNAME record는 다른 단서 (다른 도메인이 있는 CNAME record)를 가리키거나 보물(A record 안의 domain)을 가리킬 수 있습니다.

예를 들어, `blog.example.com`은 `example.com`라는 값의 CNAME record를 지니고 있습니다. 이는 DNS 서버가 `blog.example.com`를 위한 DNS record들에 도달하면, 실제로는 `example.com`을 위한 DNS 룩업이 발동되고, `example.com`의 IP주소가 A record를 통해 리턴됩니다. 이 경우, `example.com`가 `blog.example.com`의 canonical name (실제 이름)입니다.

흔히 사이트가 `blog.example.com`나 `shop.example.com`와 같이 서브도메인이 있는 경우, 그 서브 도메인들은 root domain (`example.com`)을 가리키는 CNAME record들을 가지고 있습니다.
이 방식은 호스트의 IP주소가 변해도, root domain을 위한 DNS A record만 업데이트되면 되고, 모든 CNAME record들은 root의 변경 사항만 따라가면 됩니다.

흔한 오해 중 하나는 CNAME record는 반드시 가리키고 있는 도메인의 웹사이트로 resolve되어 같은 웹사이트를 보여줘야 한다고 여겨지지만, 실은 그렇지 않습니다. CNAME 레코드들은 root 도메인과 같은 IP주소의 클라이언트를 가리킬 뿐입니다. 한번 클라이언트가 해당 IP주소에 도달하면, 웹서버는 URL에 따라 핸들링을 합니다. 따라서 `blog.example.com`은 `example.com`의 IP주소로 클라이언트를 direct하는 `example.com`을 가리키는 CNAME을 지니고 있을 수는 있습니다. 하지만 실제로 클라이언트가 IP주소에 연결되면, 웹서버는 URL이 `blog.example.com`라는 갓을 보고, 홈페이지가 아닌 블로그 페이지를 보여줄 것입니다.

CNAME record의 예:

| blog.example.com | record type: |           value:           |  TTL  |
| :--------------: | :----------: | :------------------------: | :---: |
|        @         |    CNAME     | is an alias of example.com | 32600 |

위의 예를 통해서 `blog.example.com`은 `example.com`을 가리킨다는 것을 볼 수 있고, 예시 [A record]()를 기준으로 하면, 결국 IP주소가 192.0.2.1로 resolve될 것이라고

## CNAME record가 다른 CNAME record를 가리킬 수 있나요?

가능은 하지만, 도메인이 로드되기 전에 여러번의 DNS 룩업을 요구하고, 이는 유저 경험에 부정적인 영향을 주기 때문에, CNAME record를 다른 CNAME record가 가리키게 하는 건 비효율적입니다.
예를 들어, `blog.example.com`는 `www.example.com`의 CNAME record을 가리키는 CNAME record를 가졌다고 하면,
`www.example.com`의 CNAME record은 또 `example.com`의 A record를 가리킵니다.

`blog.example.com`의 CNAME :

| blog.example.com | record type: |             value:             |  TTL  |
| :--------------: | :----------: | :----------------------------: | :---: |
|        @         |    CNAME     | is an alias of www.example.com | 32600 |

위의 또 `www.example.com`의 CNAME을 가리킵니다:

| www.example.com | record type: |           value:           |  TTL  |
| :-------------: | :----------: | :------------------------: | :---: |
|        @        |    CNAME     | is an alias of example.com | 32600 |

이런 설정은 DNS 룩업 과정에 단계를 추가하는 것이므로 가능한 피하는 것이 좋습니다. 대신, `blog.example.com`와 `www.example.com`의 CNAME record들 모두 직접 `example.com`을 가리키도록 하는 것이 좋습니다.

## CNAME record 사용의 제약

MX와 NS record들은 CNAME record들을 가리킬 수 없습니다.
대신 A record (IPv4) 또는 [[AAAA record](IPv6)]()를 가리켜야 합니다.
[MX record]()는 메일 교환 레코드로 이메일을 메일 서버로 direct합니다.
[NS record]()는 nameserver record로 어떤 DNS 서버가 해당 도메인에 신뢰(authoritative)할 수 있는 지 알려줍니다.

## references

[DNS CNAME record](https://www.cloudflare.com/learning/dns/dns-records/dns-cname-record/)
