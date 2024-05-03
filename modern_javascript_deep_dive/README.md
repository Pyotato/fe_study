# 모던 자바스크립트 딥다이브

📕 모던 자바스크립트 딥다이브 공부 기록
질문들 대답 가능 ? 딥다이브 읽은 것 : 안읽은 거

## About

> 시작일: `2024.04.29 ~` <br/>
> 목표: 하루에 최소 3 단원을 읽고 해당 장에 핵심에 관한 퀴즈 만들기
> 기대 결과: <br/>
>
> - `기록장` : 자바스크립트 딥다이브를 부분적으로 읽어서 흩어져있었고, 기억에만 의존하던 내용을 정리하고자 합니다.
> - `체크 리스트` : 방대한 내용을 다룬 책이다보니 모든게 핵심이라고 느껴질 수 있던 덩어리를 작은 단위들로 쪼개, 차후 질문에 대한 답을 하지 못한다면, 해당 내용을 복습하고자 합니다.
> - `능동적으로 생각하기` : 단순 암기를 해서 얻는 지식이 아닌, 퀴즈 형태로 스스로 답을 해보고, 체크할 수 있도록 해, 내용을 읽는 것이 아닌 생각을 먼저 끌어내는 방식으로 구성했습니다. 또한, 책을 읽으면서 어떤 부분들을 중점적으로 생각해야 할 지 고민하며 읽기 때문에 읽는 과정에서도 더 적극적으로 내용을 살필 수 있습니다.
> - `학습 방향 트랙킹` : 저는 rabbit hole에 자주 빠집니다. "왜?"라는 질문이 계속 나오고 이에 대한 답을 찾다보면, 재귀 탈출 조건을 무시하던 경우가 종종 있어, 알고 있는 건 만족할 만큼 알게 되었지만, 앞으로 나가야 하는 목적성을 잃어버릴 때가 있습니다. 이 레포는 그 베이스를 설정해주기 위한 지점입니다. 하루 3장은 기본적으로 읽고, 거기서 파생된 궁금증은 [🤿 모던 자바스크립트 디퍼 다이브](https://github.com/Pyotato/fe_study/tree/main/modern_javascript_deeper_dive)에 저장해두도록 했습니다.

## 모던 자바스크립트 딥다이브

| 분류                                                                                                                                                                 | 내용                                                                                                                                                                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [4장 변수](https://github.com/Pyotato/fe_study/blob/main/modern_javascript_deep_dive/04_variable.md)                                                                 | ✦ 변수란? <br/> ✦ 식별자란?<br/> ✦ 변수 선언 시 호이스팅이 발생하는 이유?                                                                                                                                                                                                                         |
| [5장 식과 문](https://github.com/Pyotato/fe_study/blob/main/modern_javascript_deep_dive/05_expression_and_statement.md)                                              | ✦ 표현식이란? <br/> ✦ 리터럴이란?<br/> ✦ 문이란? <br/> ✦ 표현식인 문과 표현식이 아닌 문                                                                                                                                                                                                           |
| [6장 데이터 타입](https://github.com/Pyotato/fe_study/blob/main/modern_javascript_deep_dive/06_data_type.md)                                                         | ✦ 데이터 타입이 왜 있어야 하나? <br/> ✦ 자바스크립트 데이터 타입의 종류 <br/> ✦ 0.1+0.2=0.3일까요? 왜 그럴까요? <br/> ✦ 자바스크립트에서 변수의 타입이 정해지는 시점은?                                                                                                                           |
| [7장 연산자](https://github.com/Pyotato/fe_study/blob/main/modern_javascript_deep_dive/07_operator.md)                                                               | ✦ 단항 산술연산자의 연산 결과는 (++,--,-,+의 연산 결과를 데이터 타입에 따른 예시도 제시) ? <br/> ✦ 후위 단항 연산자와 전위 단항 연산자의 차이? (++, --) <br/> ✦ (==)와 (===)의 차이? <br/> ✦ typeof null의 결과는? <br/> ✦ NaN==NaN인가요? -0 == 0은요?                                           |
| [8장 제어문](https://github.com/Pyotato/fe_study/blob/main/modern_javascript_deep_dive/08_control_flow_statement.md)                                                 | ✦ 제어문이란? <br/> ✦ switch-case문에서 폴스루 방지하는 방법은?                                                                                                                                                                                                                                   |
| [9장 타입변환과 단축 평가](https://github.com/Pyotato/fe_study/blob/main/modern_javascript_deep_dive/09_type_conversion_and_short_circuit_evaluation.md)             | ✦ falsy한 값과 truthy 한 값? <br/> ✦ 단축 평가란? <br/> ✦ 옵셔널 체이닝이란? <br/> ✦ null 병합 연산자란?                                                                                                                                                                                          |
| [10장 객체 리터럴](https://github.com/Pyotato/fe_study/blob/main/modern_javascript_deep_dive/10_object_literal.md)                                                   | ✦ 객체란? <br/> ✦ 자바스크립트 객체의 값에 접근 하는 방법 2가지? <br/> ✦ 빈 객체 person 선언시, person.last-name의 결과는? <br/> ✦ ES6에서 객체 리터럴 기능 확장된 것 3가지                                                                                                                       |
| [11장 원시 값과 객체의 비교](https://github.com/Pyotato/fe_study/blob/main/modern_javascript_deep_dive/11_primitive_value_vs_object.md)                              | ✦ 객체타입과 원시 타입의 차이 3가지 (변경 가능성, 매개변수로 전달될 때 차이, 메모리에 저장되는 것)<br/>✦ 값에 의한 전달 vs 참조에 의한 전달<br/>✦ call by value와 call by reference<br/>✦ 원시값이 immutable하고 객체 데이터 타입은 mutable하다는 것?<br/>                                        |
| [12장 함수](https://github.com/Pyotato/fe_study/blob/main/modern_javascript_deep_dive/12_function.md)                                                                | ✦ 함수란?<br/> ✦ 함수를 정의하는 4가지 방식<br/> ✦ 매개변수(parameter)와 인자(argument)의 차이<br/> ✦ 즉시 실행 함수란?<br/> ✦ 콜백함수란?<br/> ✦ 순수함수란?                                                                                                                                     |
| [13장 스코프](https://github.com/Pyotato/fe_study/blob/main/modern_javascript_deep_dive/13_scope.md)                                                                 | ✦ 스코프란? <br/> ✦ 스코프 체인이란? <br/> ✦ 블록 레벨 스코프 vs 함수 레벨 스코프? <br/> ✦ 렉시컬 스코프란? <br/>                                                                                                                                                                                 |
| [14장 전역변수의 문제점](https://github.com/Pyotato/fe_study/blob/main/modern_javascript_deep_dive/14_issues_with_global_variables.md)                               | ✦ 호이스팅은 스코프 단위로 동작한다.(🅾️ / ❎) <br/> ✦ 전역 변수의 문제 4가지<br/> ✦ 전역 변수의 사용 억제하는 방법들                                                                                                                                                                              |
| [15장 let, const 키워드와 블록 레벨 스코프](https://github.com/Pyotato/fe_study/blob/main/modern_javascript_deep_dive/15_let_const_keyword_and_block_level_scope.md) | ✦ var의 특징 3가지(함수 레벨 스코프, 중복 선언 가능성, 호이스팅) <br/> ✦ let과 const의 특징 (var과 다른점)<br/> ✦ TDZ란?<br/>                                                                                                                                                                     |
| [16장 프로퍼티 어트리뷰트](https://github.com/Pyotato/fe_study/blob/main/modern_javascript_deep_dive/16_property_attribute.md)                                       | ✦ <br/>                                                                                                                                                                                                                                                                                           |
| [17장 생성자 함수에 의한 객체 생성](https://github.com/Pyotato/fe_study/blob/main/modern_javascript_deep_dive/17_creating_objects_via_constructor.md)                | ✦ 생성자 함수란?<br/> ✦ 객체 리터럴보다 생성자 함수를 통해 객체 생성하면 좋은 점?<br/> ✦ 함수 호출 방식에 따라 함수 내부의 this는 무엇을 가르키나요?<br/> ✦ 함수도 객체인데, 일반 객체와 구분되는 특징에는 뭐가 있나요? <br/> ✦ ECMAScript 사양에서 메서드라고 인정할 수 있는 범위는 뭔가요?<br/> |
| [18장 함수와 일급 객체](https://github.com/Pyotato/fe_study/blob/main/modern_javascript_deep_dive/18_function_and_first-class_object.md)                             | ✦ <br/>                                                                                                                                                                                                                                                                                           |

## 🤿 모던 자바스크립트 Deeper 다이브 : 딥다이브 읽으면서 더 파본 내용들

> 모던 자바스크립트 딥다이브를 읽으면서 궁금증이 더 생겨서 추가적으로 공부해본 내용을 담은 레포입니다.<br/> [👉 더 깊게 파봤던 내용들이 궁금하시면 <여기로>](https://github.com/Pyotato/fe_study/blob/main/modern_javascript_deeper_dive)