**上一节我们讲到了从零搭建一个`electron+vue+ts+vite`的项目，这一节我将介绍几个好用的工具，来帮助我们更好的开发electron项目。**

* * *

**首先 ，我们在`main.ts`中加上这段代码：**

```
// main.ts
···
// 判断当前环境是否为开发环境
if (process.env.NODE_ENV === "development") {
  // 当处于开发环境时，页面加载本地服务，并自动打开开发者工具
  mainWindow.loadURL("http://localhost:5173");
  mainWindow.webContents.openDevTools();
} else {
  // 否则页面加载打包后的index.html文件
  mainWindow.loadFile(path.join(__dirname, "./index.html"));
}
···
```

**这段代码中我们希望通过判断开发环境来加载不同的服务或文件，并判断是否要自动打开开发者工具，但是当我们重新启动项目时会发现页面为空白，也不能自动打开开发者工具，并且出现了以下错误：**

![image-20230510212920208](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/image-20230510212920208.png)

**很明显，`process.env.NODE_ENV`并不等于`development`，因此页面会去加载同一层级的`index.html`，这是因为我们在运行命令时并没有把`NODE_ENV`加进来，但由于跨平台，直接在命令前添加`NODE_ENV=development`会报错，因此我们需要使用`cross-env`这个工具来解决。**

**首先安装这个工具：**

```
npm i -D cross-env
```

**然后，我们需要修改`package.json`文件中的`electron:dev`命令：**

```
···
"scripts": {
   "dev": "vite",
   "build": "vue-tsc --noEmit && vite build",
   "preview": "vite preview",
   "electron:dev": "tsc && cross-env NODE_ENV=development electron ." // 在 electron . 前增加 cross-env NODE_ENV=development
},
···
```

**修改完之后，我们再次运行`npm run electron:dev`命令，发现页面可以正常加载，并且自动打开开发者工具。**

![image-20230510172801495](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/image-20230510172801495.png)

* * *

**在启动项目时，每次都需要先开启本地`vite`服务，等待服务开启之后，才能进行启动`electron`并加载合适的页面，但这不免有些麻烦，这时有些小伙伴可能会提出，我们把这些命令写在一行，用`&&`符号连接起来不就好了，这看似很合理，但其实不行，这是因为当我们运行完 `npm run dev`时，后面的命令并不会继续执行，不信的小伙伴可以尝试一下。**

**为了解决这个问题，我们需要`concurrently`和 `wait-on`这两个工具，其中：**

-   **`concurrently`可以帮助我们同时运行多个命令**
-   **`wait-on`可以帮助我们等待某个命令执行完之后再去执行后面的命令**

**因此我们来安装这两个工具：**

```
npm i -D concurrently wait-on 
```

**同时，我们需要修改`package.json`文件：**

```
···
"scripts": {
   "dev": "vite",
   "build": "vue-tsc --noEmit && vite build",
   "preview": "vite preview",
   "electron":"wait-on tcp:5173 && tsc && cross-env NODE_ENV=development electron .", // 等待5173端口服务开启，再去运行之后的命令
   "electron:dev": "concurrently -k \"npm run dev\" \"npm run electron\"" // 同时运行多个命令
},
···
```

**修改好之后，再去运行`npm run electron:dev`命令，就可以一键启动`electron`项目了**

![image-20230510172801495](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/image-20230510172801495.png)

**至此结束。**