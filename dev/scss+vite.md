# scss vite(리액트)에서 설정해주기

> styledcomponent만 써봤다가 vinlyify에서 scss를 써보자!

일반 설치를 해주자.

> yarn add sass

하지만 안된다..

"node-sass"를 설치해주기

> yarn add --dev node-sass

~~앗 deprecated되었네..~~

package.json에서 sass로 변경해주면 된다는데 한번 봐야할듯

vite.config.ts에 아래의 부분 추가해주기

```ts
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import type { UserConfig } from "vite";
import svgr from "vite-plugin-svgr";
import type { InlineConfig } from "vitest";

type ViteConfig = UserConfig & { test: InlineConfig };
const config: ViteConfig = {
  plugins: [
    react(),
    tsconfigPaths(),
    //!!!! 추가 시작!!!!
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: "default",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
  ],
  //!!!! 추가 끝!!!!
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
};
export default defineConfig(config);
```

https://sass-lang.com/blog/libsass-is-deprecated/

https://sass-lang.com/dart-sass/

https://sass-lang.com/documentation
