type Props = {
  user: string;
};

export function SampleComponent(props: Props) {
  const showMesssage = () => {
    alert("Hello " + props.user);
  };

  const handleClick = () => {
    setTimeout(showMesssage, 3000);
  };

  return <button onClick={handleClick}>follow</button>;
}
