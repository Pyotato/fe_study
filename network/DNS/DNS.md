# DNS란

> DNS는 IP주소 대신 도메인 이름을 통해 사용자가 웹사이트에 접속할 . 수있도록 해줍니다.

### DNS란?

DNS는 인터넷의 전화번호부와 같습니다.
사람은 도메인 이름(nytimes.com이나 espn.com)으로 온라인 상의 정보에 접근하는 반면에, 브라우저는 IP주소를 통해 상호작용합니다.
DNS는 도메인 이름을 IP주소로 변환해서 브라우저가 인터넷 리소스를 로드할 수 있도록 해줍니다.

각 기기들은 유일한 IP주소를 갖고 인터넷에 연결되어 있고,
이 유일한 IP주소를 통해 다른 기기들을 식별합니다.
DNS 서버는 사람들이 `192.168.1.1(IPv4)`등의 IP주소를 외울 필요가 없게 하고, 나아가 `2400:cb00:2048:1::c629:d7a2 (IPv6)`와 같이 더 복잡한 알파벳과 숫자가 포함된 IP주소도 일일히 기억할 필요가 없게 합니다.

### DNS 동작 방식

DNS resolution은 호스트 이름 (`www.example.com`)을 컴퓨터가 이해하기 쉬운 IP주소(`192.168.1.1`)로 변환하는 과정을 포함합니다.
IP주소는 인터넷의 각 기기에게 부여되고, 이 주소는 인터넷 상에서 해당 기기를 식별하는데 필요합니다.
사용자가 웹페이지를 로드하고 싶다면, 사용자가 웹브라우저에 입력하는 값 (`www.example.com`)과 기계가 이해할 수 있는 IP주소(`192.168.1.1`)로 변환하여 `www.example.com`의 위치를 찾아내야 힙니다.

DNS resolution의 동작 과정에 대해 이해하기 위해서는 DNS 쿼리를 하면서 오가는 하드웨어 컴포넌트에 대해 알아야합니다.
웹브라우저에게는 DNS 룩업은 백그라운드에서 발생하고, 사용자의 첫 요청을 제외하고는 유저의 컴퓨터와는 상호작용을 필요로 하지 않습니다.

#### 웹페이지 로드를 위한 4가지 DNS 서버

- **DNS recursor** : 도서관 사서가 책을 찾으러 가는 거처럼 DNS recursor는 웹브라우저와 같은 애플리케이션을 통해 클라이언트 기기로부터 쿼리를 받기 위해 디자인된 서버입니다. DNS recursor는 클라이언트의 DNS 쿼리를 만족하기 위해 추가적으로 요청을 하는 담당을 합니다.
  ![DNS recursor](https://www.cloudflare.com/img/learning/dns/dns-server-types/recursive-resolver.png)
- **Root nameserver** : root server는 사람이 읽을 수 있는 호스트이름을 IP 주소로 변환하는 첫 단계입니다. 도서관에서 'ㅁ'으로 시작하는 책을 찾는다면, 자바스크립트에 해당 책꽂이칸을 찾아갑니다.
- **TLD nameserver** : Top level domain server (TLD)는 'ㅁ'칸에서 '모던 자바스크립트 딥다이브'에 해당되는 열을 찾는 역할을 합니다. 이 네임서버는 특정 IP주소룰 찾기 위한 다음 단계로, 호스트네임의 마지막 부분을 호스트합니다. 예를 들어, `www.example.com`에서 `.com`이 TLD 서버입니다.
- **Authoritative nameserver** : 이 마지막 네임서버는 '모던 자바스크립트 딥다이브' 책들 중에서 특정 일련코드가 있는 책을 특정하는 것과 같은 단계입니다. Authoritative nameserver는 nameserver 쿼리의 마지막 단계입니다. Authoritative nameserver가 요청한 레코드에 접근을 할 수 있다면, 요청한 호스트이름의 IP주소를 첫번째 요청을 했던 DNS Recursor (사서)에게 돌려줍니다.

#### authoritative DNS server와 recursive DNS resolver의 차이

두 개념 모두 DNS 인프라의 핵심적인 역할을 하는 서버들을 가리키지만,
서로 다른 기능을 하며 DNS 쿼리 파이프라인에서 다른 영역에 존재합니다.
recursive DNS resolversms DNS 쿼리의 시작 부분을 담당하고, authoritative DNS server는 끝 부분을 담당합니다.

- **Recursive DNS resolver**

Recursive DNS resolver는 클라이언트의 재귀적 요청에 응답을하고 DNS 레코드를 추적하는 역할을 담당합니다. 요청받은 레코드를 지닌 Authoritative DNS nameserver에 도달할 때까지 연속적으로 요청을 합니다 (record를 찾지 못하면 타임아웃이나 에러를 리턴).
다행히도 Recursive DNS resolver는 클라이언트한테 응답을 해줄 레코드를 추적하기 위해 무수한 요청을 항상 할 필요는 없습니다.
**캐싱**을 통해 데이터 유지해서 DNS룩업 과정에서 요청받은 데이터 요청 시간을 단축할 수 있습니다.

![](https://cf-assets.www.cloudflare.com/slt3lc6tev37/3NOmAzkfPG8FTA8zLc7Li8/8efda230b212c0de2d3bbcb408507b1e/dns_record_request_sequence_recursive_resolver.png)

- **Authoritative DNS server**

![](https://cf-assets.www.cloudflare.com/slt3lc6tev37/6Cxvsc4NOvmU4pPkKbkDmP/a7588a4c8a3c187e9175a40fa1b3d548/dns_record_request_sequence_authoritative_nameserver.png)

간단히 말하자면, Authoritative DNS server는 DNS 리소스 레코드들을 실제로 갖고 있고 이 리소스들에 대해 책임을 지고 있는 서버입니다.
이 서버는 DNS 룩업 체인의 끝에 존재하며, 쿼리된 리소스 레코드를 응답해줍니다. 궁극적으로, 웹브라우저가 IP주소에 응답이 도달하고 필요한 웹사이트나 웹리소스에 접근하도록 합니다. Authoritative nameserver는 DNS 레코드를 특정지을 수 있는 마지막 소스이므로 다른 소스를 쿼리할 필요없이 내부의 데이터로 쿼리를 충족할 수 있습니다.

## DNS 룩업 과정

DNS 룩업 정보는 쿼리를 담당하는 컴퓨터 내부적으로 혹은, DNS infrastucture에 원격으로 캐싱이됩니다.
일반적으로는 8단계를 걸쳐서 DNS 룩업이 진행됩니다.
DNS 정보가 캐싱되었다면 DNS 룩업 과정들이 생략되어 시간이 단축됩니다.
아래의 경우에는 캐싱된게 없을 때의 가정입니다.

1. 유저는 `example.com`을 웹브라우저에 검색창에 입력하면 쿼리는 인터넷을 통해 DNS recursive resolver로 전달됩니다.
2. resolver는 DNS root nameserver (.)을 쿼리합니다.
3. root server는 도메인 정보를 저장하고 있는 Top Level Domain (TLD) DNS server (ex, `.com` 또는 `.net`)의 주소로 resolver에 응답합니다. `example.com`을 검색하면 요청은 `.com` TLD를 가리키게 됩니다.
4. resolver는 `.com` TLD에 요청을 합니다.
5. TLD 서버는 도메인의 nameserver `example.com`의 IP주소로 응답합니다.
6. 마지막으로 recursive resolver는 도메인 nameserver에 쿼리를 보냅니다.
7. nameserver는 `example.com`의 IP주소를 resolver에 응답합니다.
8. DNS resolver는 웹브라우저에 초기에 요청했던 IP주소로 응답합니다.

> 여기서 부터는 DNS 룩업을 마치고 성공적으로 `example.com`의 IP주소를 반환하면 브라우저는 웹페이즈를 위한 요청을 합니다.

9.  브라우저는 IP주소에 대응하는 HTTP 요청을 합니다.
10. IP에 대응하는 서버는 웹페이지를 리턴하고 브라우저는 이를 렌더링합니다.
    ![](https://cf-assets.www.cloudflare.com/slt3lc6tev37/1NzaAqpEFGjqTZPAS02oNv/bf7b3f305d9c35bde5c5b93a519ba6d5/what_is_a_dns_server_dns_lookup.png)

## DNS resolver란?

DNS resolver는 DNS 룩업 과정의 첫 단추 역할을 하는데, 클라이언트가 첫 요청을 다룹니다. Resolver는 URL이 대응하는 IP주소로 변환될 수 있도록 연속적으로 쿼리를 하기 시작합니다.

- NOTE: 일반적으로 캐시가 되지 않은 DNS 룩업은 재귀적(recursive)/반복적(iterative) 쿼리를 합니다.

recursive DNS query와 recursive DNS resolver의 차이를 눈여겨 봐야합니다. DNS recursive resolver는 recursive quert를 받아서 필요한 요청을 하고 응답을 처리하는 컴퓨터입니다. 반면에, recursive DNS query는 쿼리 resolution을 요구하는 DNS resolver에 보내진 응답을 가리킵니다.

![](https://cf-assets.www.cloudflare.com/slt3lc6tev37/rOXBgctX2gaXNDqP5ktek/7086a97e00525159c6bd9318819c2287/dns_recursive_query.png)

## DNS query의 종류?

일반적으로 DNS 룩업에는 3가지 종류의 쿼리가 있습니다.
다른 종류의 쿼리들을 조합해서 DNS resolution 과정을 최적화하여 비용절감을 할 수 있습니다. 이상적인 상황에서는 캐싱된 레코드 데이터에 바로 접근하여 DNS name server가 비재귀적인 쿼리를 리턴할 수 있도록합니다.

### DNS query 3 종류

1. **Recursive query** : Recursive query에서 DNS 클라이언트는 DNS서버에게 요청한 리소스 레코드 혹은 찾지 못했을 경우 에러 메시지를 반환하도록 요구합니다.
2. **Iterative query** : 이 상황에서는 DNS 클라이언트는 DNS 서버가 최선의 응답을 리턴하도록 합니다. 쿼리한 DNS 서버가 대응하는 쿼리 이름을 찾지 못했을 경우, DNS server authoritative에게 더 낮은 레벨의 도메인 namespace의 위탁을 리턴합니다. 그 뒤 DNS 클라이언트는 위탁한 주소로 쿼리를 만들고, 이 과정은 에러나 타임아웃이 발생하기 전까지 쿼리 체인을 내려가며 추가적인 DNS 서버와 함께 반복합니다.
3. **Non-recursive query** : 일반적으로 DNS resolver 클라이언트가 DNS server에 권한이 있거나 캐싱되어 있는 레코드를 쿼리한다면 빌셍힙니다. 그리고, DNS 서버는 DNS bandwidth 낭비와 upstream 서버들에 부하를 방지하하기 위해 레코드를 캐싱합니다.

### DNS 캐싱이란? DNS 캐싱이 발생하는 곳?

캐싱의 목적은 일시적으로 데이터를 저장해서 데이터 요청의 신뢰성과 성능을 개선하는 것입니다. DNS 캐싱은 요청을 하는 클라이언트의 위치에 더 가까운 위치에 데이터를 저장해서 DNS 쿼리가 더 일찍 끝나고 DNS 룩업 체인을 타고가는 추가적인 쿼리를 피해서 로드 시간을 개선하고 bandwidth/CPU 소모를 줄입니다. DNS 데이터는 여러 장소에 캐싱될 수 있습니다. 각각의 장소는 DNS 레코드는 time-to-live(TTL)에 의해 일정한 시간동안 저장됩니다.

#### Browser DNS 캐싱

모던 웹브라우저는 디폴트로 DNS 레코드를 일정 캐싱하도록 디자인되었습니다.
DBS 캐싱이 웹브라우저에 더 가까울 수록, 캐시가 맞는 건지 확인하는데 걸리는 단계를 축소할 수 있고, IP주소에 올바른 요청을 할 수 있습니다.
DNS 레코드에 대한 요청이 발생했을 떄 가장 먼저 확인 되는 곳이 브라우저 캐시입니다.

#### OS level DNS 캐싱

운영체제(OS) 레벨의 DNS resolver는 DNS 쿼리가 현재 기기를 떠나기 전 들리는 마지막 로컬 저장소입니다.
이 쿼리를 핸들링하기 위한 운영체제 내부의 프로세스는 주로 **stub resolver** 또는 DNS 클라이언트라고 불립니다.
**stub resolver**가 애플리케이션으로부터 요청을 받으면, 레코드가 있는 지 먼저 자신의 캐시를 확인합니다. 만약 없다면, recursive 플래그를 설정한 DNS 쿼리를, 로컬 네트워크 밖의 ISP(Internet Service Provider) 내 DNS recursive resolver한테 보냅니다.

Recursive resolver는 추가적으로 캐시 내에 있는 레코드의 타입에 따라 추가적으로 적절한 기능을 지니고 있습니다.

1. resolver가 A record가 없지만, authoritative nameser들에 대응하는 [NS record]()를 갖고 있다면, DNS쿼리 단계들을 생략하고, 해당 네임서버들에게 직접 쿼리를 합니다.
2. 만약 resolver가 NS record가 없다면, root server를 스킵하고 TLD서버(`.com`)에게 쿼리를 보냅니다.
3. resolver가 TLD 서버를 가리키는 레코드가 없는 드문 경우에는 root server를 쿼리합니다. 이는 주로 DNS 쿼리가 제거되고 나서 일어납니다.

## References

- [What is DNS | How DNS works](https://www.cloudflare.com/learning/dns/what-is-dns/)
- [DNS server types](https://www.cloudflare.com/learning/dns/dns-server-types/)
