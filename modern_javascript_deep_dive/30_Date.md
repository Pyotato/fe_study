# 30장 Date

<details>

<summary> 1. Date 를 활용하여 현재 날짜와 시간을 초 단위로 반복 출력하는 코드를 작성해주세요. </summary>

```
const printCurrentTime = ()=>{
  const today = new Date(); // 현재 시간;
  const dayName = ['월','화','수','목','금','토','일'];
  const day = dayName[today.getDay()];

  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  const ampm = today >= 12? 'PM' : 'AM';

  hour%=12;  // 12 시간제로
  hour = hour || 12; // 0시면 12로

  minute = minute < 10 ? '0' + minute: minute; // 분을 두자리로
  second = second < 10 ? '0' + second: second; // 초도 두자리로

  const now = `${year}년 ${month}월 ${date}일 ${day}요일 ${hour}:${minute}:${second}`;
  console.log(now);
  setTimeout(printCurrentTime,1000); // 1초마다 재귀적으로 호출
}

printCurrentTime();

```

</details>

## 💭 TMI

> 이런 함수들이 있었구나 하고 넘어가는 장? 같았다. Intl.DateTimeFormat로 한국 시간 나타냈었었는데 간단하게 toLocaleString('ko-KR')로도 나타낼 수 있었구나.
