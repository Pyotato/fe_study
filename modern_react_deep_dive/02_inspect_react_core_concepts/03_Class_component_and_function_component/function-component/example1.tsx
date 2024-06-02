import { useState } from "react";
type SampleProps = {
  required?: boolean;
  text: string;
};

export function SampleComponent({ required, text }: SampleProps) {
  const [count, setCount] = useState<number>(0);
  const [isLimited, setIsLimited] = useState<boolean>(false);

  function handleClick() {
    const newValue = count + 1;
    setCount(newValue);
    setIsLimited(newValue >= 10);
  }

  return (
    <h2>
      Sample Component
      <div>{required ? "필수" : "필수 아님"}</div>
      <div>문자: {text}</div>
      <div>count: {count}</div>
      <button onClick={handleClick} disabled={isLimited}>
        증가
      </button>
    </h2>
  );
}
