# 컴포넌트 타이핑 vs. 프롭스 구조분해의 차이

컴포넌트에 scss를 입히기 위해 커스텀 프롭스의 타입을 지정해주기 위해
다음과 같이 타이핑을 해줬다.

```tsx
export interface ImgUrlProps extends SVGProps<SVGImageElement> {
  imgUrl?: string;
  link: ReactNode;
}

const CoverImage: FC<ImgUrlProps> = ({ imgUrl, link }) => {
  return (
    <>
      <img
        src={imgUrl == null ? PLACEHOLDER_IMAGE : imgUrl}
        alt={imgUrl}
        loading="lazy"
        className={classNames("cover-image")}
      />
      {link}
    </>
  );
};
```

위와 아래의 차이는 뭘까?

```tsx
export interface ImgUrlProps extends SVGProps<SVGImageElement> {
  imgUrl?: string;
  link: ReactNode;
}

const CoverImage = ({ imgUrl, link }: ImgUrlProps) => {
  return (
    <>
      <img
        src={imgUrl == null ? PLACEHOLDER_IMAGE : imgUrl}
        alt={imgUrl}
        loading="lazy"
        className={classNames("cover-image")}
      />
      {link}
    </>
  );
};
```

`FC<ImgUrlProps>`나 `({ imgUrl, link }: ImgUrlProps)`와 깉이 할 수 있는데,
둘이 좀 다르다.

먼저, `FC<ImgUrlProps>`는 함수 컴포넌트를 전체적으로 타이핑하기 때문에
React FC 타입을 모두 가질 수 있도록합니다. React FC tyoe뿐만 아니라 그 하위의 자식 타입도 타이핑 됩니다.
반면 `{ imgUrl, link }: ImgUrlProps`는 오직 구조분해된 프롭스를 타이핑합니다.

따라서 `FC<ImgUrlProps>`는 FC타입의 기본 프롭스인 key또한 자식들에 암묵적 타이핑이 됩니다. `{ imgUrl, link }: ImgUrlProps`는 명시적으로 타이핑이 되어 추가적인 프롭스가 타이핑 되지 않습니다. 간결함과 디폴트 프롭스 타이핑을 유연하게 사용하고 싶은 경우에는 `FC<ImgUrlProps>`를, 더 정확한 타이핑을 위해서는 `{ imgUrl, link }: ImgUrlProps`를 사용할 수 있습니다.
