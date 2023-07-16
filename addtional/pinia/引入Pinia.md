# 引入Pinia

## 1. npm 下载pinia包

```bash
npm install pinia
```

## 2. 在 src 目录下新建 `store` 文件夹

```bash
cd src
mkdir store
touch index.ts
cd store
mkdir modules
cd modules
mkdir demo
cd demo
touch index.ts
```

```ts
// store/index.ts
import {createPinia} from 'pinia';

const pinia = createPinia();

export default pinia;
```

```ts
// store/demo/index.ts
import { defineStore } from "pinia";

const useDemoStore = defineStore("demo", {
  state: () => {
    return {
      count: 0,
    };
  },
});

export default useDemoStore;
```

```ts
// store/index.ts
import {createPinia} from 'pinia';
+ import useDemoStore from './modules/demo';

const pinia = createPinia();

export default pinia;
+ export { useDemoStore };
```

```bash
cd target/src
```

```ts
// src/main.ts
// ...
+ import pinia from './store';

const app = ...;

+ app.use(pinia);

app.mount(#app);
```

```vue
// HelloWorld.vue
<script setup lang="ts">
	import { useDemoStore } from "../store";
	const store = useDemoStore();
    
    - const count = ref(0);
    + const count = ref(store.count);
</script>
```

