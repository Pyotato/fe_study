# 32장 String

<details>

<summary> 1. String 객체는 생성자 함수 객체이며, String 래퍼 객체는 유사배열 객체이다. (🅾️ / ❎)  </summary>

```
🅾️
String은 표준 빌트인 생성자 함수 객체입니다.
new 연산자와 함께 호출하면 String인스턴스를 생성할 수 있습니다.
인수로 전달한 값은 [[StringData]] 내부 슬롯에 할당되며, 인수를 전달하지 않으면 빈문자열이 래퍼 객체에 할당되어 생성됩니다.
String 래퍼 객체는 배열처럼 요소들을 순회 가능하며 문자열의 숫자를 인덱스로 하여 접근가능합니다.
문자열 타입은 변경 불가능하며, String 메서드는 모두 읽기 전용객체입니다.
String 메서드는 accessor method에 해당되어 원본 배열을 직접 변경하지 않고, 새로운 배열을 생성해 리턴합니다.
```

</details>

<details>

<summary> 2. 소문자 알파벳의 아스키 코드 배열을 반환하는 코드를 작성해주세요.  </summary>

```js
let alpha = "az";
let [start, end] = [alpha.codePointAt(0), alpha.codePointAt(1)]; // 문자열의 인덱스를 인수로 받아 해당 알파벳의 UTF16번호를 숫자로 반환
const arr = Array.from({ length: end - start + 1 }, (_, i) =>
  String.fromCharCode(start + i)
);
// 인수로 받은 숫자의 UTF16코드에 해당되는 알파벳을 반환
console.log(arr);
```

</details>

<details>

<summary> 3. replace 함수 교체 패턴을 활용해 'hello i am pyotato'의 'pyotato'를 굵은 글씨체 태그로 감싸는 방법은? </summary>

```js
const word = "hello i amd pyotato";
word.replace("pyotato", "<strong>$&</strong>");
```

</details>

## 💭 TMI

> replace 함수의 첫 인수로 정규표현식을 넣을 수 있다는 건 처음 알았다! 그리고 특정 패턴을 활용해서 교체 가능하다는 것도 신기. <br/>
> charAt을 살펴보다가 유사한 메서드로 charCodeAt이나 codePointAt이 있다는 거를 봤는데, 둘의 차이에 대해서는 UTF16 lone surrogates에 관한 내용이 있다고 하길래 deeper dive에서 더 살펴보기로 했다.
