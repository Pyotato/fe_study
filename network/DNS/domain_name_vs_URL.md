# 도메인 이름? | 도메인 이름 vs. URL

> 도메인 이름이란 웹사이트에 접근하기 위한 유일하고 기억하기 쉬운 주소입니다. `google.com` 또는 `facebook.com` 등이 도메인 이름에 해당됩니다. 유저들은 DNS을 통해 도메인 이름으로 웹사이트에 접속할 수 있습니다.

## 도메인 이름이란?

도메인 이름은 웹사이트를 접근하려는 클라이언트가 알파벳과 숫자 일련의 조합으로 된 (alphanumeric) [IP주소]()를 가리키는 텍스트 string입니다. 도메인 이름을 브라우저 윈도우에 입력해서 특정 웹사이트에 접근할 수 있습니다.
예를 들어, Google의 도메인 이름은 `google.com`입니다.

실제 웹사이트의 주소는 복잡한 숫자로된 IP주소(`192.0.2.2`)로 이루어져 있지만, [DNS](https://github.com/Pyotato/fe_study/blob/main/network/DNS/DNS.md) 덕분에 유저들은 사람에게 친숙한 도메인 이름을 통해 찾으려는 사이트에 접근할 수 있습니다.

## 도메인 이름은 누가 관리하나요?

도메인 이름은 주로 도메인 등록처에서 관리합니다. 공인 등록 기관의 대리자 역할로 도메인 이름을 예약합니다. 현재는 300 M 이상의 등록된 도메인이 있습니다.

## 도메인 이름과 URL의 차이?

URL(uniform resource locator)는 가끔 웹주소라고도 불리며, 사이트의 도메인 이름뿐만 아니라, 프로토콜, path등의 추가적인 정보등을 담고 있습니다.
예를 들어, `https://cloudflare.com/learning/’, ‘cloudflare.com`의 URL을 보면 `cloudflare.com`이 도메인이며, `https`는 프로토콜이며, `/learning/`는 웹사이트의 특정 페이지의 path를 가리킵니다.

## 도메인 이름은 어떻게 구성되나요?

도메인 이름은 주로 2 ~ 3 의 부분으로 `.`로 구분할 수 있으며 오른쪽을 기준으로 왼쪽으로 갈 수록 더 자세한 identifier로 이루어져 있습니다. 오른쪽 마침표 `.`의 오른쪽에 있는 section은 [TLD(top-level domain)]()에 해당되며, '통상적인(generic)' TLD로는 `.com`, `.net`, `.org` 등과 국가를 나타내는 `.uk` , `.kr` 등이 있습니다.

TLD의 왼쪽에 있는 section은 second-level domain(2LD), 그 왼쪽에 있는 sectiondms third-level domain(3LD)이라고 불립니다.

다음 예시에서

Google US의 도메인 이름 `google.com`에서 :

- `.com`은 TLD (가장 일반적)
- `google`은 2LD (가장 상세한)

Google UK의 경우 도메인 이름 `google.co.uk`에서 :

- `.com`은 TLD (가장 일반적)
- `.co`는 2LD (이 경우 2LD는 도메인이 등록된 기관 타입을 나타냅니다. .co는 UK에서 회사가 등록한 사이트에 해당)
- `google`은 3LD (가장 상세한)

## references

[What is a domain name? | Domain name vs. URL](https://www.cloudflare.com/learning/dns/glossary/what-is-a-domain-name/)
