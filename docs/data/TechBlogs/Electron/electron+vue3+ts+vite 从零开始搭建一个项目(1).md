## 背景

**本人最近在学习`electron`桌面端开发，作为一个前端小白，在与`vue3`和`typescript`结合时踩了不少坑，网上现有的资料或视频大多讲诉不够清晰或者较为陈旧，容易使人知其然但不知其所以然，遂写下此文章以记录项目搭建过程，以供参考。废话不多说，我们开始。**

## 项目搭建过程

**首先使用`vite`工具创建一个`vue3+ts`的项目。命令如下：**

```cmd
npm create vite
```

**框架我们选择`vue+ts`。之后我们运行以下命令来启动这个项目。**

```cmd
cd test-project
npm i
npm run dev
```

**接下来访问`http://127.0.0.1:5173/`地址可以看到项目已经启动成功。**

![image-20230510172801495](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/image-20230510172801495.png)

**接下来我们安装`electron`，使用以下命令（注意，我们这里使用 `-D` 来安装开发依赖，之后所使用到的包均为开发依赖，不再过多赘述。：**

```cmd
npm i -D electron
```

**同时，在根目录创建一个`electron`文件夹，并在里面新建两个文件，分别是`main.ts`和`preload.ts`。**

```typescript
// main.ts

// 控制应用生命周期和创建原生浏览器窗口的模组
const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 引入预加载文件
      preload: path.join(__dirname, "preload.js"),
    },
  });
    
  // 加载vite启动的本地服务
  mainWindow.loadURL("http://localhost:5173");

}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他
    // 打开的窗口，那么程序会重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此，通常对程序和它们在
// 任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
```

```typescript
// preload.ts

// 这里我们随便写一句话
console.log("preload");
```

**由于`main.ts`和`preload.ts`均为ts文件，需要编译为`js`文件，因此在`tsconfig.json`中进行配置：**

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": false, // 这里设为false
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true,
    "noEmit": false, // 这里设为false
    "outDir": "dist" // 这里设置输出文件和vite打包后的文件一致，保证main.js和preload.js和打包后的index.html在同一路径
  },
  "include": ["electron/*.ts"], // 要编译的文件
  "references": [{ "path": "./tsconfig.node.json" }]
}

```

**之后再`package.json`中进行配置：**

```json
{
  "name": "test-project",
  "private": true,
  "version": "0.0.0",
  "main": "dist/main.js", //设置入口文件，即main.ts编译后的文件
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",  // 这里需要在vue-tsc后面加上 --noEmit
    "preview": "vite preview",
    "electron:dev":"tsc && electron ." // 这里是启动electron命令，先通过tsc编译ts文件，再运行electron .
  },
  ···
}
```



**由于我们在`main.ts`使用加载本地服务的方式来访问`vue`页面，因此我们需要先启动本地服务。**

```cmd
npm run dev
```

**等待服务开启，运行以下命令即可打开electron窗口：**

```cmd
npm run electron:dev
```

![image-20230510214217808](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/image-20230510214217808.png)

**至此，一个简单的`electron+vue3+ts+vite`应用就创建完成了。**

****

**看到这里可能有人会发现，我们每次都要先启动服务，等到服务开启之后才能执行`electron:dev`命令，能不能做到一个命令解决呢？答案肯定是可以的，下一节我将会介绍几个好用的工具来提升我们的开发效率。**