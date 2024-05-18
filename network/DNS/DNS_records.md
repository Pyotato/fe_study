# DNS records

> DNS records는 DNS 서버에 존재하고 있는 지시사항의 set입니다. 이 지시사항은 성공적인 DNS 룩업에 핵심적입니다.

## DNS record란?

zone file이라고도 하는 [DNS](https://github.com/Pyotato/fe_study/blob/main/network/DNS/DNS.md) record는 authoritative [DNS servers]() 내에 존재하는 지시사항들입니다. DNS record는 도메인이 가리키고 있는 [IP 주소]()를 포함하여, 도메인에 대한 요청을 어떻게 핸들링해야할 지 등의 정보를 제공합니다.
이 레코드들은 DNS syntax로 작성된 여러개의 text file들로 구성됩니다. DNS syntax는 DNS 서버가 무엇을 해야할 지 알려주는 커맨드들의 문자들의 string입니다.
모든 DNS record들은 얼마나 자주 DNS서버가 해당 record를 새로고침해야할 지 알려주는 [TTL (time-to-live)]()도 있습니다.

네이버 지도에서 장소를 검색하면 영업장의 이름, 위치, 영업 시간, 제공하는 서비스 등, 여러가지 유용한 정보를 제공하는데,
DNS records의 set 또한 이러한 기능을 제공한다고 볼 수 있습니다. 모든 도메인들은 적어도 몇 개의 필수적인 DNS record들이 있어야 유저가 도메인 이름을 통해 웹사이트에 접근할 수 있으며, 특정 기능을 제공하기 위해서는 추가적인 선택적인 record들도 포함해야 합니다.

## 가장 흔한 종류의 DNS record들?

- [A record]() : 도메인의 IP주소를 지녔습니다.
- [AAAA]() : IPv4룰 포함하고 있는 A record들과는 달리 도메인의 IPv6 주소를 포함.
- [CNAME record](https://github.com/Pyotato/fe_study/blob/main/network/DNS/CNAME_record.md) : 하나 이상의 도메인이나 서브도메인을 다른 도메인으로 포워딩하는 record (IP주소는 제공하지 않습니다.)
- [MX record](): 메일을 이메일 서버로 direct해줍니다.
- [TXT record]() : 어드민이 레코드 내에 text note를 저장할 수 있도록 해주는 record. 주로 이메일 보안을 위해서 쓰입니다.
- [NS record]() : DNS entry를 위한 name server을 저장
- [SOA record]() : 도메인에 관한 어드민 정보를 저장
- [SRV record]() : 특정 서비스를 위한 port를 특정
- [PTR record]() : reverse 룩업을 위한 도메인 이름을 제공

## 상대적으로 덜 사용하는 DNS record들?

- AFSDB record : 이 레코드는 Andrew File System (AFS)의 클라언트들을 위한 것으로 다른 AFS cell들을 찾는 역할을 합니다.
- APL record : `address prefix list`는 주소 영역을 특정하는 실험적인 레코드입니다.
- CAA record : `certification authority authorization` 레코드로, 도메인 주인이 어떤 certificate authorities들이 어떤 도메인에 증명서를 발행할 수 있을 지 정할 수 있습니다.CAA record가 존재하지 않으면 누구나 도메인 certificate을 발행할 수 있습니다. 이 레ㅗ드들은 서브도메인들이 상속합니다.
- DNSKEY record : [DNS Key Record]()는 [Domain Name System Security(DNSSEC)]()시그니처를 인증할 [public key]()를 포함합니다.
- DNAME record : `delegation name` record는 CNAME처럼 도메인 가명(alias)을 만들지만, 이 가명은 모든 서브도메인 또한 redirect합니다. 에를 ㄷ르어, 만약에 `example.com`의 주인이 `website.net` 도메인을 구매하고 DNAME record를 `example.com`을 가리키도록 설정했다면, 포인터는 `‘blog.website.net`와 다른 서브 도메인들도 extend 합니다.
- HIP record : `Host identity protocol`를 사용해서 IP주소의 역할을 분리하는 레코드입니다. 주로 모바일 computing에 쓰입니다.
- IPSECKEY record: ‘IPSEC key’ record는 [TCP/IP]()의 일부이자 end-to-end 보안 프로토콜 프레임워크인 [Internet Protocol Security (IPSEC)]() 와 함께 동작합니다.
- NAPTR record : `name authority pointer` record는 [SRV record]()와 합쳐져서 정규표현식에 따라 동적으로 URI를 생성하여 가르키도록 할 수 있습니다.
- NSEC record: `next secure record`는 DNSSEC의 일부로, 요청한 DNS 리소스 레코드가 존재하지 않다는 것을 증명하기 위해 쓰입니다.
- RRSIG record: `resource record signature`는 DNSSEC와 함께 record들을 인증하기 위한 digital signature들을 저장하기 위한 record
- RP record: `responsible person` record로, 도메인을 책임지는 사람의 이메일 주소를 저장합니다.
- SSHFP record: SSH public key fingerprints 들을 저장합니다. SSH는 `Secure Shell`의 약자로, 안전하지 않은 네트워크대신 cryptographic networking protocol을 통해 안전한 연결을 가능하도록 합니다.

## references

[DNS records](https://www.cloudflare.com/learning/dns/dns-records/)
