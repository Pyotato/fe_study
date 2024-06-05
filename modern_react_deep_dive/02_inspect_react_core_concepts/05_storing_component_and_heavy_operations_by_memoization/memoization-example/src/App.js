import React, { useEffect, useMemo, useState } from "react";

function useMath(number) {
  const [double, setDouble] = useState(0);
  const [triple, setTriple] = useState(0);

  useEffect(() => {
    setDouble(number * 2);
    setTriple(number * 3);
  }, [number]);
  // return { double, triple };
  return useMemo(() => ({ double, triple }), [double, triple]);
}

function App() {
  const [counter, setCounter] = useState(0);
  const value = useMath(10);
  useEffect(() => {
    console.log(value.double, value.triple);
  }, [value]); // 값이 변하지 않아도 계속 출력

  function handleClick() {
    setCounter((prev) => prev + 1);
  }
  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={handleClick}>+</button>
    </div>
  );
}

export default App;
