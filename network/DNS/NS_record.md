# DNS NS record

> 어떤 DNS 서버가 신뢰가능한 지(authoritative) 알려주는 NS record

## DNS NS record란?

NS는 nameserver의 약자입니다.
nameserver는 어떤 DNS 서버가 해당 도메인(실제로 DNS record들을 포함한 서버)에 신뢰가능한 지(authoritative) 가리킵니다.
즉, NS record들은 도메인의 IP주소를 찾기 위해 인터넷이 어디로 가야할 지를 알려줍니다. 도메인은 주로 여러개의 NS record들을 갖고 있고, 도메인에 대응하는 primary와 secondary 네임서버들을 알려줍니다. 적절히 NS record들을 설정하지 않으면 유저들은 웹사이트나 애플리케이션을 제대로 로드할 수 없게 됩니다.

NS 레코드의 예시:

| example.com | record type: |         value:         |  TTL  |
| :---------: | :----------: | :--------------------: | :---: |
|      @      |      NS      | ns1.exmaple.server.com | 21600 |

‼️ NS record들은 절대로 [CNAME record (canonical name))](https://github.com/Pyotato/fe_study/blob/main/network/DNS_CNAME_record.md)를 가리킬 수 없다는 점에 주목해주세요.

## Nameserver란?

네임서버는 DNS 서버의 한 종류입니다.
네임서버는 [A records](), [MS records](), CNAME records를 포함한, 도메인을 위한 DNS record들을 모두 저장하고 있는 서버입니다.

거의 모든 도메인은 신뢰도를 높이기 위해 여러개의 nameserver를 지니고 있습니다.
예를들어, 하나의 nameserver가 닫히거나 접근할 수 없는 경우, DNS 쿼리들은 다른 nameserver로 가면됩니다. 일반적으로 하나의 primary nameserver가 있고 여러개의 secondary nameserver가 있습니다.
Secondary namesever는 primary server를 완전히 복사한 DNS record를 저장하고 있습니다.
Primary nameserver를 업데이트하면 secondary nameserver에도 같은 업데이트가 발생하도록 합니다.

대부분의 경우에서처럼 여러개의 nameserver가 사용되면 NS record들은 하나 이상의 서버를 등록해야합니다.

## 언제 NS record들을 업데이트하거나 변경해야할까요?

도메인 어드민들은 도메인 네임서버가 변경될 때 NS record들을 업데이트해야합니다.
예를 들어, 어떤 클라우드 제공자들은 네임서버를 제공하고 고객들이 직접 클라우드를 가리키도록 요구합니다.

어드민들은 서브도메인이 다른 네임서버를 사용하기를 원할 때 DNS record들을 업데이트하기를 바랄 수도 있습니다. 이전의 예를 다시 보자면, `example.com`의 네임 서버는 `ns1.exampleserver.com`입니다.
만약 `example.com`의 어드민이 `blig.example.com`이 `ns2.example.com`을 통해 resolve되기를 바란다면, NS record를 업데이트해서 설정할 수 있습니다.

NS 레코드들이 업데이트되면, DNS 전반의 변경사항을 복제를 하기 위해 몇 시간이 거릴 수 있습니다.

## References

[DNS NS record](https://www.cloudflare.com/learning/dns/dns-records/dns-ns-record/)
