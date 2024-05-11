# 37장 Set과 Map

<details>

<summary> 1. Set으로 교집합,합집합,차집합,부분집합과 상위집합을 구현해보세요. </summary>

```
Set은 배열과 비슷하지만, 중복값을 허락하지 않고, 인덱스로 값에 접근이 불가능하며, 수학적 집합을 나타내기 위한 자료구조입니다.

교집합은 두 집합 간에 공통으로 갖고 있는 값들만 모아둔 집합으로, 다음과 같이 구현할 수 있습니다.

Set.prototype.intersection = function(B) {
 return new Set([...this].filter((v)=>B.has(v)));
}

const A = new Set([1,2,3,5]);
const B = new Set([1,3,4]);

A.intersection(B); // {1,3}


합집합은 두 집합 모두의 원소를 중복없이 모아놓은 집합입니다.

Set.prototype.union = function(B) {
 return new Set([...this, ...B]);
}

const A = new Set([1,2,3,5]);
const B = new Set([1,3,4]);

A.union(B); // {1,2,3,4,5}

차집합은 두 집합에서 다른 집합의 교집합을 제외한 부분입니다.
Set.prototype.difference = function(B) {
 return new Set([...this].filter((v)=>!B.has(v)));
}

const A = new Set([1,2,3,5]);
const B = new Set([1,3,4]);

A.difference(B); // {2,5}
B.difference(A); // {4}

한 집합이 다른 집합에 포함되는 경우 부분 집합입니다.

Set.prototype.isSubSet = function(B){
  for(let item of this){
    if(!B.has(item)){
      return false;
    }
  } return true;
}

const A = new Set([1,2,3,5]);
const B = new Set([1,3,4]);
const C = new Set([1,3]);

A.isSubSet(B); // false (A가 B의 부분집합)
C.isSubSet(A); // true (C가 A의 부분집합)

```

</details>

<details>

<summary> 2. Map과 일반 객체의 차이점에는 어떤 것들이 있나요? </summary>

```
Map은 키와 값으로 이루어진 이터러블한 컬렉션입니다.
가장 큰 차이는 Map은 키 타입에 제한이 없어 객체를 포함한 모든 값이 키로 사용될 수 있습니다.
Map은 객체와 달리 set 메소드를 통해 프로퍼티를 추가하며, has로 키를 갖고 있는 지 확인합니다.
그리고 값을 가져오기 위해서는 get메소드를 통해 값이 존재하면 키에 해당되는 값을, 없다면 undefined를 반환합니다.
또한 size 프로퍼티로 값들의 개수를 읽을 수 있습니다.
```

</details>

## 💭 TMI

> Set과 Map 코테 풀때 유용하게 써서 친근..Set.prototype으로 메서드 추가해주는 거 눈도장찍기 👀
