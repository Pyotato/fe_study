# 31장 Regex

<details>

<summary> 1. 정규표현식이란?</summary>

```
정규 표현식은 일정한 패턴을 가진 문자열의 집합을 표현하기 위한 형식 언어입니다.
정규 표현식을 활용하여 문자열의 패턴을 매칭할 수 있어 편리합니다.
규칙이 복잡해지면 가독성이 떨어지는 문제가 있지만,
반복문을 통해 요소들을 순회하면서 비교할 필요없이 패턴을 정의하고 테스트하는 것만으로 간단히 체크할 수 있다는 장점도 있습니다.

```

</details>

<details>

<summary> 2. i, g, m 플래그는 어떤 뜻을 가졌나요? </summary>

```
i는 ignore case로, 대소문자 구분없이 패턴을 검색합니다.
g는 global로, 대소문자를 구분하여 패턴과 일치하는 모든 문자열을 전역에서 검색합니다.
m는 multiline으로, 줄바꿈이 있어도 패턴을 검색합니다.

```

</details>

<details>

<summary> 3. 정규표현식을 활용해 문자열을 3개씩 잘라 배열로 리턴해주세요. </summary>

```
const regex = /.../g; // .은 문자 한개를 의미합니다.
const test = 'this is a test! I want slices of 3 letters, without using the slice method😀'
console.log(test.match(regex)); // ['thi', 's i', 's a', ' te', 'st!', ' I ', 'wan', 't s', 'lic', 'es ', 'of ', '3 l', 'ett', 'ers', ', w', 'ith', 'out', ' us', 'ing', ' th', 'e s', 'lic', 'e m', 'eth', 'od\uD83D']
```

</details>

<details>

<summary> 4. [] 내의 ^와 밖의 차이? </summary>

```
[] 내의 ^ 은 NOT을 의미하지만, [] 밖의 ^ 은 시작을 의미합니다.
예를 들어,

const regexNot = /[^abc]/g;
const regexStart = /^[abc]/g;
const abc = 'abc';

console.log(regexNot.test(abc), regexStart.test(abc))
// false true

```

</details>

## 💭 TMI

> 검색해서 찾아봤던 regex..뭔지는 알고 쓰게 된 느낌.<br/>
> 아직은 조금 어렵다
