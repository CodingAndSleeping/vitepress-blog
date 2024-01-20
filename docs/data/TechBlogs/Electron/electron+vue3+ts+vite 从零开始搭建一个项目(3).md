
**这一节我们来讲以下`electron`项目的打包。**

* * *

**`electron`打包主要用到的工具为`electron-builder`，首先安装该工具：**

```cmd
npm i -D electron-builder
```

**然后，在`package.json`文件中增加`build`配置项，并进行如下配置：**

```json
···
"build":{
  "appId": "my-app", // app的id
  "productName": "el-vue-test", // 项目名称
  "copyright": "Copyright © 2021 <condingandsleeping>", // 版权信息
  "mac": { // mac中的相关打包配置
      "category": "public.app-category.utilities"
  },
  "nsis": { // windows中安装程序配置
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
  },
  "files": [ 
      "dist" // 要打包的文件夹
  ],
  "directories": {
      "buildResources": "assets",
      "output": "build" // 输出文件夹
  }
}
···
```

**除了以上配置之外，还有很多相关配置，具体可以查阅`electron-builder`的官方文档。**

**同时，在`package.json`文件中增加命令`electron:build`：**

```json
···
"scripts": {
  "dev": "vite",
  "build": "vue-tsc --noEmit && vite build",
  "preview": "vite preview",
  "electron": "wait-on tcp:5173 && tsc && cross-env NODE_ENV=development electron .",
  "electron:dev": "concurrently -k "npm run dev " "npm run electron""，
  "electron:build":"npm run build && tsc && electron-builder" // 打包命令，执行顺序为 vite打包、tsc编译、electron打包
},
···
```

**最后，修改vite.config.ts:**

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
​
// https://vitejs.dev/config/
export default defineConfig({
  base:"./", // 增加相对路径配置项，保证index.html可以找到打包后的js和css文件
  plugins: [vue()],
})
```

**执行`npm run electron:build`进行打包，打包后会增加两个文件夹，具体的文件目录为：**

```txt
···
dist
 -assets
 -index.html
 -main.js
 -preload.js
 -vite.svg
 
build
 -win-unpacked
 -builder-debug.yml
 -builder-effective-config.yaml
 -test-project Setup 0.0.0.exe
 -test-project Setup 0.0.0.exe.blockmap
···
```

**至此，一个完整的electron项目就打包完成了**

**完整的配置文件如下：**

```json
// package.json
{
  "name": "test-project",
  "private": true,
  "version": "0.0.0",
  "main": "dist/main.js",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview",
    "electron": "wait-on tcp:5173 && tsc && cross-env NODE_ENV=development electron .",
    "electron:dev": "concurrently -k "npm run dev " "npm run electron"",
    "electron:build":"npm run build && tsc && electron-builder"
  },
  "dependencies": {
    "vue": "^3.2.47"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.1.0",
    "concurrently": "^8.0.1",
    "cross-env": "^7.0.3",
    "electron": "^24.2.0",
    "electron-builder": "^23.6.0",
    "typescript": "^4.9.3",
    "vite": "^4.2.0",
    "vue-tsc": "^1.2.0",
    "wait-on": "^7.0.1"
  },
  "build":{
    "appId": "my-app",
    "productName": "test-project",
    "copyright": "Copyright © 2021 <xxx>",
    "mac": {
      "category": "public.app-category.utilities"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    },
    "files": [
      "dist"
    ],
    "directories": {
      "buildResources": "assets",
      "output": "build"
    }
  }
}
​
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": false,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true,
    "noEmit": false,
    "outDir": "dist"
  },
  "include": ["electron/*.ts"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
​
// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [vue()],
})
```
