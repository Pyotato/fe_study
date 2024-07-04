⚠️ 저작권 보호를 위해 자료 및 예시가 대체되었습니다. 예시 코드는 React⚛️로 작성되었습니다.
🫨 통신사 가입을 하기 위해서 아래와 같이 긴 폼과 약정이 포함된 페이지를 마주치게 될 때가 있다.

이렇게 많은 페이지들을 넘나드는 흐름을 효율적으로 관리하는 방법이 뭘까?
이번글에서는 토스 SLASH23에서 다룬 퍼널을 통한 분기와 상태 관리에 대해 살펴보자.

'플랫폼 디자이너가 효율을 만들어내는 법'에서 소개한 화면 흐름
서비스를 개발할 때 대표적인 프론트엔드 패턴들
1. 상점


상점 패턴


목록 페이지 -> 상세 페이지 구조로 이루어져 있고, 블로그나 뉴스, To-do 리스트도 이 유형에 해당된다.



2. 단일 페이지


단일 페이지 패턴


페이지 이동 없이 한 화면 내에서 상호작용할 수 있고, 지도나 메신저 앱이 이 유형에 해당된다.



3. 설문조사


설문 조사 패턴


여러 페이지들을 통해 상태를 수집 -> 결과 페이지로 이루어진 형태, 회원가입 mbti 검사, 결제 신청서 등이 이 유형에 해당된다. 오늘 핵심적으로 다룰 패턴은 "설문조사 패턴"이고, 토스에서는 이를 '퍼널(funnel)'패턴이라고 부른다.



funnel은 '깔대기'를 뜻한다. 깔때기에 모래를 부으면 고은 입자는 통과하고 굵은 입자는 필터 되듯이, 

다양한 유저들이 서비스에 처음 들어가서 최종 목표에 도달하기까지 조금씩 필터된다.


 퍼널 패턴 코드 개선 방법 3가지
퍼널 패턴 코드를 개선하기 위한 접근 방법으로는 기초적인 부분에서 먼저 살펴본다.
1. 응집도
2. 추상화
3. 시각화


📝  퍼널 구조로 페이지를 넘어가면서 정보를 수집하는 흐름은 유사하여 SKT USIM 온라인 개통으로 대체했습니다.



전반적인 디자인 요구사항 흐름은 다음과 같다.




단계별로 살펴보자면, 






신규 가입을 선택하고 다음으로 진입하게 되면 






























1 단계 : 통신 유형에 대한 정보를 stepSeq=1에서 수집하고,


































2 단계 : 요금제 선택에 대한 정보를 stepSeq2 단계에서 수집한다.


































3 단계 : 선택한 요금제에 따라 지불해야 하는 요금 정보를 제공하고,






































4 단계 :  선택한 요금제에 따른 혜택 선택 정보를 stepSeq=4에서 수집한다.

























5 단계: 유저의 개인 정보를 stepSeq=5에서 수집하고,

가입 API를 호출하여 1~5에서 수집한 데이터 (통신 유형/요금제 선택/ 혜택 선택/ 개인 정보)를

넘기면 가입 완료🥳





















🤔 어떤 방식으로 해당 흐름을 구현할 수 있을까?
1. 기본 구조로 설계
먼저 페이지 별로 파일을 구성해 보는 방법이 있다.

🗂️ USIM 신규 가입 (/buyproc) 
ㄴ 📄 통신유형.tsx (/net-typ?stepSeq=1)
ㄴ 📄 요금제.tsx (/charge?stepSeq=2)
ㄴ 📄 요금확인.tsx (/condition?stepSeq=3)
ㄴ 📄 혜택.tsx (/benf?stepSeq=4)
ㄴ 📄 개인정보.tsx (/self-auth?stepSeq=5)
ㄴ 📄 가입완료.tsx 


각 페이지에 해당되는 파일들을 만들고, router.push('/${다음페이지 주소}')로 다음 페이지로 이동시킨다.

각 페이지에 필요한 상태가 나눠져 있기 때문에 전역 상태  const [registerData, updateRegisterData] = useGlobalState(registerData)로 상태를 유지할 수 있다.



동작도 잘 되는 괜찮은 설계지만, 유지보수의 측면에서는 개선할 부분이 보인다.



( 1 ) 페이지 흐름이 직관적이지 않다.

       - 통신유형.tsx, 요금제.tsx, 요금확인.tsx, 혜택.tsx, 개인정보.tsx, 가입완료.tsx 이 페이지들의 흐름을 파악하기 위해서는 

 router.push('/${다음페이지 주소}')을 타고 가면서 5개의 페이지들을 들어가서 봐야 파악이 가능하다.



(2) 상태가 여기저기 흩어져 있어서 디버깅이 어려워지고 api에 기능을 추가하기가 까다롭다.

       - 가입을 위한 정보들을 전역 상태로 각 페이지에서 수집했지만, api 전송을 위해 전역상태의 사용되는 곳은 개인정보.tsx다.

       - 디버깅을 위해 개인정보.tsx 뿐만 아니라 전체를 대상으로 데이터 흐름을 추적해야 하는 문제가 생긴다.

👩🏻‍🔧 개선 방향 1: 연관된 코드는 가까운 곳에 배치하여 흩어져 있는 상태와 페이지들을 한 곳으로 모으기!  ➡️ 응집도 높이기


 const [registerData,updateRegisterData] =useGlobalState(registerData) 지역 상태 만들고, step 상태에 따라 UI 컴포넌트를 조건부 렌더링한다.

const [registerData, updateRegisterData] = useState();

const [step, setStep] = useState<
"통신유형" | "요금제" | "요금확인" | "혜택" | "개인정보" | "가입완료"
>("통신유형");

return (
<main>
{step === "통신유형" && <통신유형 onNext={(data) => setStep("요금제")} />}
{step === "요금제" && <요금제 onNext={(data) => setStep("요금확인")} />}
{step === "요금확인" && <요금확인 onNext={(data) => setStep("혜택")} />}
{step === "혜택" && <혜택 onNext={(data) => setStep("개인정보")} />}
{step === "개인정보" && <개인정보 onNext={(data) => setStep("가입완료")} />}
{step === "가입완료" && <가입완료 />}
</main>
);


각 단계에서   다음  버튼을 클릭하면 step 상태를 원하는 UI로 업데이트하여,

UI 세부 사항은 하위 컴포넌트에서 관리하고, step의 이동은 상위에서 관리하여 한 곳에서 상태를 관리할 수 있게 되었다.



api 호출에 필요한 상태도 상위에서 관리해주무므로 다음과 같이 추가해 줄 경우, 어떤 UI에서 정보가 수집되는지

페이지를 타고 갈 필요 없이 바로 알 수 있다.

{step === "개인정보" && (
    <개인정보
       onNext={async () => {
           await fetch("/api/register", { data });
          setStep("가입완료");
       }}
    />
)}


또는 다음과 같이 다른 api를 추가하더라도 손쉽게 도입이 가능하다.

const [registerData, updateRegisterData] = useState();

const [step, setStep] = useState<
| "통신유형"
| "요금제"
| "요금확인"
| "혜택"
| "개인정보"
| "혜택수신여부"
| "가입완료"
>("통신유형");

return (
     <main>
         {step === "통신유형" && <통신유형 onNext={(data) => setStep("요금제")} />}
         {step === "요금제" && <요금제 onNext={(data) => setStep("요금확인")} />}
         {step === "요금확인" && <요금확인 onNext={(data) => setStep("혜택")} />}
         {step === "혜택" && <혜택 onNext={(data) => setStep("개인정보")} />}
         {step === "개인정보" && <개인정보 onNext={() => setStep("혜택수신여부")} />}
         {step === "혜택수신여부" && (         
                  <혜택수신여부
                           onNext={async () => {
                                        await fetch("/api/register", { data });
                                        setStep("가입완료");
                           }}/>
           )}
         {step === "가입완료" && <가입완료 />}
      </main>
);



👩🏻‍🔧 개선 방향 2: 다른 퍼널에서도 이 코드를 재사용하고 싶다  ➡️ 라이브러리로 추상화하기



const [registerData, updateRegisterData] = useState();

const [step, setStep] = useState<
| "통신유형"
| "요금제"
| "요금확인"
| "혜택"
| "개인정보"
| "혜택수신여부"
| "가입완료"
>("통신유형"); // step 관련 로직

return (
     <main>
         // step 관련 로직들
         {step === "통신유형" && <통신유형 onNext={(data) => setStep("요금제")} />}
         {step === "요금제" && <요금제 onNext={(data) => setStep("요금확인")} />}
         {step === "요금확인" && <요금확인 onNext={(data) => setStep("혜택")} />}
         {step === "혜택" && <혜택 onNext={(data) => setStep("개인정보")} />}
         {step === "개인정보" && <개인정보 onNext={() => setStep("혜택수신여부")} />}
         {step === "혜택수신여부" && (         
                  <혜택수신여부
                           onNext={async () => {
                                        await fetch("/api/register", { data });
                                        setStep("가입완료");
                           }}/>
           )}
         {step === "가입완료" && <가입완료 />}
      </main>
);


📚 References
https://www.youtube.com/watch?v=NwLWX2RNVcw
https://toss.tech/article/how-platform-designer-make-effectiveness

