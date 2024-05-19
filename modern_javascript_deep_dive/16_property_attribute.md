# 16장 프로퍼티 어트리뷰트

<details>

<summary> 1. 자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다. (🅾️ / ❎) </summary>

```
🅾️
프로퍼티의 상태란,
프로퍼티의 값(value),
갱신 가능여부 (writable),
열거 가능 여부 (enumerable),
재정의 여부(configurable)를 지칭합니다.

자바스크립트 엔진은 프로퍼티 상태들을 내부슬롯으로 관리합니다.
getOwnPropertyDescriptor 메서드를 통해 이 값들을 간접적으로 확인 가능합니다.
```

</details>

<details>

<summary> 2. 데이터 프로퍼티와 접근자 프로퍼티는 뭔가요? </summary>

```
데이터 프로퍼티는 키와 값으로 구성된 일반적인 프로퍼티입니다.
데이터 프로퍼티의 프로퍼터 attribute는 프로퍼티를 생성할 때 자바스크립트 엔진이 기본값으로 자동 정의합니다.
[[value]], [[Writable]], [[Enumerable]], [[Configurable]]이 데이터 프로퍼티의 프로퍼티 attribute에 해당됩니다.

접근자 프로퍼티는 자체적으로 값을 갖지 않고
다른 데이터 프로퍼티 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티입니다.
접근자 프로퍼티의 프로퍼티 attribute에는 [[Get]], [[Set]], [[Enumerable]], [[Configurable]]이 있습니다.

두 프로퍼티의 [[Enumerable]], [[Configurable]]는 같습니다.

예를 들어,

const person = {
    firstName : 'pyotato',
    lastName : 'pyo',
    get fullName(){
        return `${this.firstName} ${this.lastName}`
    }
    set fullName(name){
        [this.firstName,this.lastName] = name.split(' ');
    }
}

person의 firstName과 lastName 프로퍼티는 일반적인 데이터 프로퍼티지만,
get과 set이 앞에 붙은 메소드들은 getter/setter 함수이며, fullName의 접근자 프로퍼티입니다.
접근자 프로퍼티는 자체적으로 값([[Value]])을 갖지 않지만 데이터 프로퍼티의 값을 읽거나
저장할 때 관여합니다.

```

</details>

<details>

<summary> 3. 객체 변경 방지하는 방법? </summary>

```
객체의 변경을 방지하기 위한 메서드들에는 `Object.preventExtensions`, `Object.seal`, `Object.freeze`가 있습니다.
이들은 객체의 변경을 금지하는 정도에 차이가 있습니다.
`Object.preventExtensions`는 프로퍼티 추가를 방지하는 메서드입니다. 동적으로 프로퍼티를 추가하거나 Object.defineProperty로 프로퍼티를 재정의할 수 없습니다.
`Object.seal`은 객체를 밀봉하는 메서드로 프로퍼티의 값을 변경할 수는 있지만 프로퍼티를 추가하거나 삭제하거나 attribute를 재정의할 수 없습니다.
마지막으로 `Object.freeze`는 객체 변경 방지가 가장 엄격합니다.
처음 객체를 정의할 때의 상태에서 프로퍼티 수정/삭제/변경/추가 모두 불가능합니다.

```

|         구분          |          메서드          | 프로퍼티 추가 | 삭제 | 값 쓰기 | attribute 재정의 |
| :-------------------: | :----------------------: | :-----------: | :--: | :-----: | :--------------: |
|    객체 확장 금지     | Object.preventExtensions |       X       |  O   |    O    |        O         |
|       객체 밀봉       |       Object.seal        |       X       |  X   |    O    |        X         |
| 객체 동결 (READ ONLY) |      Object.freeze       |       X       |  X   |    X    |        X         |

</details>

## 💭 TMI

> 이번 장은 어떻게 읽고 뭐가 중요한 지 애매했던 느낌었다.<br/>
> 읽었는데, 뭐라고 정리해야 할 지 몰라서 다음장을 읽고 다시 읽어봤다.<br/>
> 뭐라고 정리할 지 결국은 몰라서 네번째 읽어보고 정리했다. <br/>
> 프로퍼티가 속성이고 attribute도 속성인데, 프로퍼티의 속성이라면 약간 메타 속성같은 느낌으로 받아들여졌다.
> 즉, 객체는 프로퍼티가 있는데 그 프로퍼티가 값([[Value]])이 뭔지, 수정 가능 한 지([[Writable]]), 이터러블인지([[Enumerable]]), 재정의 가능한 지([[Configurable]]) 등의 속성(property)의 속성(attribute)애 관한 장이었다.
