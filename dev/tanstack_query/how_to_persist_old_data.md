# 이전 데이터를 placeholder로 두는 법

> 문제: 키보드 입력값을 debounce해서 데이터를 fetch 해오는데,
> 이전 데이터가 없으면 isFetched까지 빈화면이 그려졌다.

- 첫 접근
  - useMemo로 이전 값을 fetch 해올 때만 보여주기
- 더 쉬운 방법이 있다.
  - 해결: use쿼리의 placeholder를 이전 값을 유지하도록 해줬다.

```ts
import { searchFromMyTopOne, searchKeyword } from "@/api/spotify";
import { URL_PARAMS } from "@/constants";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const useSearchKeyword = (keyword: string | null) => {
  const [searchParams] = useSearchParams();

  // 검색어를 입력하지 않은 경우 내 top1 아티스트 기준으로
  const defaultSearch = useQuery({
    queryKey: useSearchKeyword.queryKey(),
    queryFn: () => searchFromMyTopOne().then((v) => v.response),
    staleTime: Infinity,
  });

  const keywordParam = searchParams.get(URL_PARAMS.KEYWORD);

  const res = useQuery({
    queryKey: useSearchKeyword.queryKey(keywordParam),
    queryFn: () => searchKeyword(keywordParam),
    notifyOnChangeProps: ["data"],
    staleTime: 2_000,
    placeholderData: keepPreviousData, // 🌟 이 파트!
  });
  if (!searchParams.has(URL_PARAMS.KEYWORD) && !keyword) return defaultSearch;

  return res;
};
useSearchKeyword.queryKey = (keyword?: string | null) => {
  const qk = ["search", "list"];
  if (keyword == null || keyword === "") return qk;
  return [...qk, keyword];
};
```

[출처](https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries#better-paginated-queries-with-placeholderdata)
