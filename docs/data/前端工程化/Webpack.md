# 前端工程化之 Webpack

::: warning
本文基于 webpack 5.x 版本进行介绍，对于 webpack 4.x 版本可能存在部分功能不兼容的情况。
:::

## 一、webpack 简介

`webpack` 是一个用于现代 `JavaScript` 应用程序的静态模块打包工具。当 `webpack` 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示具体的内容。

![img7](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/img7.png)

## 二、webpack 入门

### 1.起步

安装 webpack 和 webpack-cli。

```zsh
pnpm i webpack webpack-cli -D
```

安装成功, 设置 `build` 命令：

```json
// package.json
{
  "name": "01-getting-started",
  "version": "0.1.0",
  "main": "index.js",
  "author": "condingandsleeping <<1162300237@qq.com>>",
  "license": "MIT",
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "webpack": "^5.98.0",
    "webpack-cli": "^6.0.1"
  }
}
```

新建 src 目录，并在其中新建 `index.js` 和 `heading.js` 文件。

```js
// index.js
import createHeading from './heading.js';

const heading = createHeading();

document.body.append(heading);
```

```js
// heading.js
export default () => {
  const element = document.createElement('h2');

  element.textContent = 'Hello world';
  element.addEventListener('click', () => {
    alert('Hello webpack');
  });

  return element;
};
```

执行 `npm run build` 命令，默认会打包生成 `dist/main.js` 文件。

新建 `index.html` 文件，引入 `dist/main.js` 文件。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Webpack</title>
  </head>
  <body>
    <!-- 引入打包后的文件 -->
    <script src="dist/main.js"></script>
  </body>
</html>
```

最终文件目录：

```zsh
- dist
  - main.js
- src
  - index.js
  - heading.js
- package.json
- index.html
```

全局安装 `serve` 命令， 在当前目录下执行 `serve .` 命令，会启动本地服务器，访问 `http://localhost:3000/` 地址，可以看到页面正常输出。

### 2.配置文件

`webpack`除了可以通过命令行参数进行配置外，还可以通过在根目录创建 `webpack.config.js` 文件进行一些打包配置。

#### 1.1 entry & output

通过配置 `entry` 属性指定入口文件，`output` 属性指定打包后的文件名和路径。

```js
// webpack.config.js
const path = require('path');
module.exports = {
  entry: './src/main.js', // 入口文件
  output: {
    filename: 'bundle.js', // 打包后的文件名
    path: path.join(__dirname, 'output'), // 打包后的文件路径
  },
};
```

#### 1.2 mode

通过配置 `mode` 属性指定打包模式。默认为 `production`。

```js
const path = require('path');
module.exports = {
  ...
  mode: 'development', // 打包模式 - 开发模式
  ...
};
```

|    模式     |                               说明                               |
| :---------: | :--------------------------------------------------------------: |
| development | 开发模式下，Webpack 会自动优化打包速度，添加一些调试过程中的辅助 |
| production  |    生产模式下，Webpack 会自动优化打包结， 压缩、tree shaking     |
|    none     |   none 模式下，Webpack 就是运行最原始的打包，不做任何额外处理    |

#### 1.3 loader

`webpack` 默认只能打包 js 文件，如果项目中引入了其他文件类型，例如 `css`、`less`、`scss` 、`json`、`html`、`image` 等文件类型，则需要配置不同的 `loader` 来对不同的文件类型进行转换， `loader`可以是同步的，也可以是异步的。

`loader` 配置方式是配置在 `module.rules` 属性中：

- `rules` 是一个数组，可以配置多个加载器规则。
- 每个规则都是一个对象，包含 `test`、`use`。`test` 属性是一个正则表达式，用于匹配要加载的文件，`use` 配置对应的 `loader`， 可以配多个。

简单示例：

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /.css$/, // 匹配所有 .css 结尾的文件
        use: [
          'style-loader', // 将 CSS 代码注入到 HTML 页面中
          'css-loader' // 转换 css 代码
        ]
      }
    ]
  }
  ...
}
```

> 注意： **`loader` 是链式调用的，执行顺序是从后往前**，上面的配置表示先使用 `css-loader` 转换 `css` 文件，再使用 `style-loader` 将 `CSS` 代码注入到 `HTML` 页面中。

下面介绍一些常用的 `loader`：

• `css-loader`： 将`CSS` 文件用 `require` 的方式引入，并返回一个 css 代码

• `style-loader`：将 `CSS` 代码注入到 `HTML` 页面中，通过 `<style>` 标签添加样式

• `less-loader`：用于加载和转换 `less` 文件

• `sass-loader`：用于加载和转换 `sass` 文件

• `file-loader`： 用于处理文件，例如图片、字体等

• `url-loader`：用于处理文件，并将它们转为 `base64` 编码，减少请求数量

• `babel-loader`：用于加载和转换 `ES6` 代码，将其转换为浏览器可以识别的代码

• `html-loader`：用于加载和转换 `HTML` 文件

常用的 `loader` 配置示例：

```js
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // babel 预设
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024, // 图片大小小于 10kb 时，会自动转为 base64 编码 否则会启用 file-loader
              name: '[name].[ext]', // 输出文件名
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            attrs: ['img:src', 'a:href'], // 处理 img 和 a 标签的 src 属性
          },
        ],
      },
    ],
  },
  ...
}
```

当以上 `loader` 不满足我们的需求时，我们还可以编写自定义 `loader` 来处理不同的文件类型。

自定义 `markdown-loader`：

```js
const marked = require('marked');

// 导出一个函数，接收 源代码 作为参数
module.exports = (source) => {
  // 处理 markdown 文件
  const html = marked(source);
  // 返回 html 字符串交给下一个 loader 处理
  return html;
};
```

在 `webpack.config.js` 中配置 `markdown-loader`：

```js
module.exports = {
  ...
  module: {
    rules: [
       {
        test: /.md$/, // 匹配所有 .md 结尾的文件
        use: [
          'html-loader', // 将转换好的 html 代码交给 html-loader 处理
          './markdown-loader' // 自定义的 markdown-loader
        ]
      }
    ],
  },
  ...
}
```

#### 1.4 plugin

`plugin` 是 `webpack` 的强大功能之一，它可以扩展 `webpack` 的功能， 它会运行在 `webpack` 构建流程的不同阶段， 贯穿了 `webpack`的整个编译周期。它可以解决 `loader` 无法实现的一些问题。

基本使用：

```js
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  ...
  plugins: [
    new webpack.ProgressPlugin(), // webpack内置插件 - 显示打包进度
    new CleanWebpackPlugin(), // 自动清理打包目录
    new HtmlWebpackPlugin() // 自动生成 html 文件
  ]
  ...
}
```

常用的 `plugin`：

- `CleanWebpackPlugin`：自动清理打包目录
- `HtmlWebpackPlugin`：自动生成 html 文件
- `CopyWebpackPlugin`：复制文件到打包目录
- `DefinePlugin` ：定义环境变量
- `HotModuleReplacementPlugin`： 热更新插件
- `MiniCssExtractPlugin`：提取 css 文件到一个单独的文件中

常用的 `plugin` 配置示例：

```js
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  ...
  plugins: [
    new CleanWebpackPlugin(), // 自动清理打包目录

    new HtmlWebpackPlugin({
      title: 'webpack plugin', // 设置生成的 html 文件的 title， html中需要使用<%= htmlWebpackPlugin.options.title %> 指定
      meta: {
        viewport: 'width=device-width', // 设置生成的 html 文件的 viewport
      },
      template: './src/index.html', // 指定生成的 html 文件的模板
    }),
    new CopyWebpackPlugin({
      patterns: ['public'], // 复制 public 文件到打包目录
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
  ],
  ...
};
```

`html`模版文件：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

使用 `DefinePlugin` 注入全局成员变量：

```js
const webpack = require('webpack');

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      // 值要求的是一个代码片段
      STRING: '"string"',
      TRUE: true,
      TRUE_STRING: JSON.stringify(true),
      OBJECT: { foo: 'bar' },
      OBJECT_STRING: JSON.stringify({ foo: 'bar' }),
      NUMBER: 123,
      NUMBER_STRING: JSON.stringify(123),
      FUNCTION: function () {},
      FUNCTION_STRING: '"function () {})"',
    }),
  ],
};
```

在 `main.js` 中使用：

```js
console.log(STRING);
console.log(STRING_STRING);
console.log(TRUE);
console.log(TRUE_STRING);
console.log(OBJECT);
console.log(OBJECT_STRING);
console.log(NUMBER);
console.log(NUMBER_STRING);
console.log(FUNCTION);
console.log(FUNCTION_STRING);
```

打包过后的结果：

```js
/******/ (() => {
  // webpackBootstrap
  console.log('string');
  console.log('string');
  console.log(true);
  console.log(true);
  console.log({ foo: bar });
  console.log({ foo: 'bar' });
  console.log(123);
  console.log(123);
  console.log(function () {});
  console.log('function () {})');
  /******/
})();
```

需要注意的是，在注入全局变量时，如果该值为字符串，它将被作为代码片段来使用。如果是一个对象，它的值将被作为代码片段来使用。

编写`plugin`：

`plugin` 插件是一个具有 `apply` 方法的 `JavaScript` 对象。`apply` 方法会被 `webpack compiler` 调用，并且在整个编译生命周期都可以访问 `compiler` 对象。

```js
class MyPlugin {
  apply(compiler) {
    console.log('MyPlugin 启动');
    // emits hooks : 输出 asset 到 output 目录之前执行
    compiler.hooks.emit.tap('MyPlugin', (compilation) => {
      // compilation 可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        // 遍历所有资源
        if (name.endsWith('.js')) {
          // 处理 js 文件
          const contents = compilation.assets[name].source();
          const withoutComments = contents.replace(/\/\*\*+\*\//g, ''); // 去除注释
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length,
          };
        }
      }
    });
  }
}

module.exports = MyPlugin;
```

在 `webpack.config.js` 中配置 `MyPlugin`：

```js
const MyPlugin = require('./my-plugin.js')
module.exports = {
  ...
  plugins: [
    new MyPlugin(), // 自定义的 plugin
  ],
  ...
};
```

`plugin`的具体的生命周期有很多，可以参考[官方文档](https://www.webpackjs.com/api/compiler-hooks)

#### 1.5 devServer

`devServer` 提供用于开发的 `HTTP`服务器。集成了实时编译和自动刷新等功能。

首先，安装 `webpack-dev-server`：

```zsh
pnpm i webpack-dev-server -D
```

可以使用命令行启动 `devServer`：

```zsh
pnpm webpack serve
```

它会将打包结果存放在内存中,并监听文件变化,自动重新编译和自动刷新浏览器。

在 `webpack 5.x` 版本中，默认开启 静态资源目录为 `public`目录，用于访问静态资源，可以设置 `static` 为 `false`，关闭静态资源目录功能。注意：在 `4.x`的版本中是使用 `contentBase` 配置静态资源目录。

::: tip
为什么要配置静态资源目录，是因为在开发环境中频繁拷贝 `public` 目录中的静态资源到 `dist` 目录，很耗费性能，因此配置静态资源目录可以让打包后的结果直接访问 `public` 目录。
:::

还可以通过指定 `open` 和 `port` 来开启自动打开浏览器和修改端口号：

```js
module.exports = {
  ...
  devServer: {
    open: true, // 自动打开浏览器
    port: 3000, // 修改端口号
  },
  ...
}
```

此外，在解决开发环境跨域问题时，还可以配置`proxy`属性，用过 `vite` 的应该不陌生。

```js
module.exports = {
  ...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://server.com',  // 目标服务器地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // 重写路径
        },
      },
    },
  },
  ...
}
```

其他的属性还有很多，可以参考[官方文档](https://www.webpackjs.com/configuration/dev-server)。

#### 1.6 source map

`source map` 是一种映射关系，它将编译后的代码映射回源代码，方便开发者调试。

在 `webpack 5.x` 版本中，默认开启 `source map`，可以通过配置 `devtool` 属性来修改 `source map` 的生成方式。

`source map`的类型有很多种，接下来，主要以 `source-map` 和 `eval` 两种生成方式进行介绍。

首先，在 `webpack.config.js` 中配置 `devtool` 为 `source-map`：

```js
module.exports = {
  ...
  devtool: 'source-map', // 开启 source map
  ...
}
```

然后在， 在 `main.js` 中添加一端错误的代码：

```js
import createHeading from './heading.js';

const heading = createHeading();

document.body.append(heading);

console.log1('error'); // 错误代码
```

然后进行打包，可以看到 `dist` 目录下生成了 `main.js` 和 `main.js.map` 文件。

![img9](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/img9.png)

进入 `dist`目录下，使用 `serve .`命令启动本地服务器，访问 `http://localhost:3000/` 地址，可以看到控制台输出了错误信息，以及对应的源代码的所在的行信息。

![img13](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/img13.png)

在来看一个 `eval` 的例子：

```js
module.exports = {
  ...
  devtool: 'eval', // 开启 eval source map
  ...
}
```

同样进行打包, `dist` 目录下并没有生成 `map`文件：

![img11](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/img11.png)

而是在 打包生成的文件中，使用 `eval`函数执行代码，只能映射到编译后的代码, 不能映射到源代码, 因此错误只能定位到文件。

![img14](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/img14.png)

![img15](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/img15.png)

除此之外，`source map` 还有很多种类型, 每种类型生成的效率和速度都不同，因此需要根据具体情况进行选择。

从**初次构建速度**、 **监视模式再次构建速度**、 **是否适合生产**以及**生成质量**四个维度进行对比：

|            devtool             | build | rebuild | production |                      quilty                      |
| :----------------------------: | :---: | :-----: | :--------: | :----------------------------------------------: |
|            `(none)`            | ​ 快  |  ​ 快   |     否     |             低（不生成 `.map` 文件）             |
|             `eval`             | ​ 快  |  ​ 快   |     否     |      低（不生成 `.map` 文件，内联在代码中）      |
|    `eval-cheap-source-map`     | 较快  |  较快   |     否     |            较低（仅映射行，不映射列）            |
| `eval-cheap-module-source-map` | 较快  |  较快   |     否     |          中等（映射行和模块，不映射列）          |
|       `eval-source-map`        | 较慢  |  较慢   |     否     |           ​**高**​（映射行、列和模块）           |
|       `cheap-source-map`       | 较快  |  较快   |     否     |            较低（仅映射行，不映射列）            |
|   `cheap-module-source-map`    | 较快  |  较快   |     否     |          中等（映射行和模块，不映射列）          |
|      `inline-source-map`       | 较慢  |  较慢   |     否     |    ​**高**​（映射行、列和模块，内联在代码中）    |
|          `source-map`          | 较慢  |  较慢   | 是（可选） |        ​**高**​（生成单独的 `.map` 文件）        |
|      `hidden-source-map`       | 较慢  |  较慢   | 是（可选） |    ​**高**​（生成 `.map` 文件，但不关联代码）    |
|     `nosources-source-map`     | 较慢  |  较慢   | 是（可选） | ​**高**​（生成 `.map` 文件，但不包含源代码内容） |

以上就是各种 `devtool` 的类型的特点，在开发中可以灵活选择，这里比较推荐这种方式：

- 开发模式选择`eval-cheap-source-map`：开发阶段，生成速度较快，错误信息可以映射到行。
- 生产模式选择 `none`：生成速度最快，不生成 `.map` 文件，不会暴露源代码。

#### 1.7 HMR

`hmr` 全称 `Hot Module Replacement`，即热模块替换，是 `webpack` 提供的一种在不刷新浏览器的情况下更新模块的功能。

开启 `hmr` 功能，需要在 `webpack.config.js` 中配置 `devServer` 的 `hot` 属性：

```js
module.exports = {
  ...
  devServer: {
    hot: true, // 开启 hmr
  },
  ...
}
```

对于 `css` 文件是可以自动热更新的， 而对于`js`文件 则需要在入口文件中使用 `module.hot.accept` 方法，告诉 `webpack` 哪些模块需要热更新，执行怎样的更新：

```js
if (module.hot) {
  let lastEditor = editor;
  // 第一个参数传递模块路径，第二个参数传递回调函数
  module.hot.accept('./editor', () => {
    // editor 模块更新了，需要这里手动处理热替换逻辑
    const value = lastEditor.innerHTML;
    document.body.removeChild(lastEditor);
    const newEditor = createEditor();
    newEditor.innerHTML = value;
    document.body.appendChild(newEditor);
    lastEditor = newEditor;
  });
}
```

::: tip
在 `Webpack 5.x` 中，​ 不需要手动添加 `HotModuleReplacementPlugin`。当你设置 `devServer.hot: true` 时，`Webpack` 会自动启用该插件。
:::

## 三、webpack 进阶

### 1.tree shaking

`tree shaking` 是 `webpack` 提供的一种优化功能，它可以自动删除没有使用的代码，减少打包后的文件大小。具体是通过在 `optimization` 选项中的`usedExports`和 `minimize`配置搭配使用来实现，这个功能在 `production` 模式中默认开启。

下面具体来讲解这两个配置的用法：

首先，在 `src` 目录下创建 `components.js` 文件：

```js
export const Button = () => {
  return document.createElement('button');

  console.log('dead-code'); // 无用的代码
};

export const Link = () => {
  return document.createElement('a');
};

export const Heading = (level) => {
  return document.createElement('h' + level);
};
```

在 `main.js` 中只引入 `components.js` 文件中的 `Button` 组件：

```js
import { Button } from './components';

document.body.appendChild(Button());
```

`webpack.config.js` 配置中将`mode`设置为 `none`，方便查看变化，同时配置 `entry`、 `output`属性：

```js
module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
  },
};
```

先看一下什么都不配置的打包结果，通过搜索关键字可以发现，无用的代码和未引用的代码也被打包进了最终的结果中，并导入了出去：

![img16](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/img16.png)

然后，在 `webpack.config.js` 中配置 `optimization.usedExports` 属性为 `true`：

```js
module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
  },
  optimization: {
    // 模块只导出被使用的成员
    usedExports: true,
  },
};
```

再次打包，可以看到，无用的代码和未引用的代码还是被打包了进去，只是未引用的代码没有使用，被编辑器标记成了灰色：

![img17](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/img17.png)

最后，在 `webpack.config.js` 中配置 `optimization.minimize` 属性为 `true`：

```js
module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
  },
  optimization: {
    // 模块只导出被使用的成员
    usedExports: true,
    // 压缩代码，并剔除无用的代码
    minimize: true,
  },
};
```

再次打包，可以看到，代码进行了压缩和变量替换，通过关键字搜索，没有发现未引用的代码，也没有发现无用的代码。表明 `tree shaking` 功能起作用了。

![img18](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/img18.png)

需要注意的是，如果配置了 `babel-loader`，并将代码转换成了其他模块例如 `commonjs`，那么 `tree shaking` 功能将失效，因为 `webpack` 无法识别其他模块的依赖关系。可以**将 `modules` 设置为 `false`，或者使用默认，也就是`auto`来关闭 `ESM` 模块的转换**。

```js
 module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              // 如果 Babel 加载模块时已经转换了 ESM，则会导致 Tree Shaking 失效
              // ['@babel/preset-env', { modules: 'commonjs' }]
              // 可以将 modules 设为 false 或使用默认配置，也就是 auto，这样 babel-loader 会自动关闭 ESM 转换
              ['@babel/preset-env', { modules: false }]
              // ['@babel/preset-env', { modules: 'auto' }]

            ]
          }
        }
      }
    ]
  },
```

总结：

- `usedExports` 配置可以让 `webpack` 只导出被使用的成员。可以理解成对未引用的代码进行标记（编辑器的置灰功能）
- `minimize` 配置可以让 `webpack` 压缩代码，减少文件大小，并剔除无用的代码
- 如果使用 `babel-loader` 进行了 `ESM` 模块的转化，则会导致 `tree shaking` 失效

### 2.scope hoisting

`scope hoisting` 是指将每个模块合并到同一个模块中。具体是通过在 `optimization` 选项中的`concatenateModules`配置来实现，下面来讲解这个配置的用法：

同样的代码，在 `webpack.config.js` 中将 `optimization.concatenateModules` 属性设置为 `true`：

```js
module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
  },
  optimization: {
    // 合并模块
    concatenateModules: true,
  },
};
```

再次打包，可以看到，所有的模块被合并到了同一个作用域下，最终的结果简化了不少。

![img21](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/img21.png)

### 3.side effects

`side effects` 是 `webpack` 提供的一种优化功能，它可以自动分析模块的依赖关系，并分析出模块的副作用，从而决定是否要将模块打包到一个文件中。具体是通过在 `optimization` 选项中的`sideEffects`配置来实现，这个功能在 `production` 模式中默认开启。

下面具体来讲解这个配置的用法：

首先，在 `src` 目录下创建 `extend.js` 和 `global.css` 文件：

```js
// 为 Number 的原型添加一个扩展方法
Number.prototype.pad = function (size) {
  // 将数字转为字符串 => '8'
  let result = this + '';
  // 在数字前补指定个数的 0 => '008'
  while (result.length < size) {
    result = '0' + result;
  }
  return result;
};
```

```css
body {
  background-color: #e07474; // 给 body 元素添加背景颜色
}
```

在 `main.js` 中引入 `extend.js` 和 `global.css` 文件：

```js
// 样式文件属于副作用模块
import './global.css';

// 副作用模块
import './extend';

console.log((8).pad(3));
```

`webpack.config.js` 中打开 `sideEffects` 配置：

```js
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    sideEffects: true,
  },
  plugins: [new HTMLWebpackPlugin()],
};
```

然后，在 `package.json` 中声明 `sideEffects` 属性为 `false`：

```json
{
  "name": "webpack-demo",
  "sideEffects": false // 声明 sideEffects 属性为 false
}
```

然后打包，运行 `serce ./dist`，启动本地服务器，访问 `http://localhost:3000/` 地址，可以看到控制台输出了错误信息，背景色也没有生效：

![img19](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/img19.png)

这是因为在 `package.json` 中声明了 `sideEffects` 属性为 `false`， 表明引入的模块中没有副作用， `webpack`将没有副作用的模块给移除了。为了解决这个问题，需要在 `package.json` 中指定哪些模块有副作用，`sideEffects` 可以设置一个数组，在数组中添加有副作用的模块：

```json
{
  "name": "webpack-demo",
  "sideEffects": ["./src/extend.js", "*.css"] // 声明 具有副作用的模块
}
```

再次打包，运行，可以看到，控制台正常输出，背景色也生效了：

![img20](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/img20.png)

### 4.code splitting

#### 4.1 muti entry

`webpack` 支持多入口配置，可以配置多个入口文件，生成不同的打包文件

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'none',
  entry: {
    index: './src/index.js', // 入口文件1
    album: './src/album.js', // 入口文件2
  },
  output: {
    filename: '[name].bundle.js', // 通过 [name] 占位符来生成不同的文件名
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Multi Entry',
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'], // 指定引入的入口文件
    }),
    new HtmlWebpackPlugin({
      title: 'Multi Entry',
      template: './src/album.html',
      filename: 'album.html',
      chunks: ['album'], // 指定引入的入口文件
    }),
  ],
};
```

打包会生成 `index.bundle.js` 和 `album.bundle.js`，并且分别生成对应的 `index.html` 和 `album.html` 文件：

![img22](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/img22.png)

#### 4.2 split chunks

`split chunks` 是 `webpack` 提供的一种优化功能，在进行多入口文件打包时，公共的模块会进行多次打包，`split chunks` 可以将公共的模块提取到单独的 `chunk` 中，具体是通过在 `optimization` 选项中的`splitChunks`配置来实现，这个功能在 `production` 模式中默认开启。

在多入口的基础上增加以下配置：

```js
  optimization: {
    splitChunks: {
      // 自动提取所有公共模块到单独 bundle
      chunks: 'all'
    }
  },
```

打包结果如下：

![img23](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/img23.png)

#### 4.3 dynamic import

`dynamic import` 是 `webpack` 提供的一种异步加载模块的功能，可以实现按需加载，从而减少初始加载时间。

首先，在 `src` 目录下创建 `dynamic.js` 文件：

```js
export default function () {
  const element = document.createElement('div');
  element.innerHTML = 'Dynamically loaded module';
  document.body.appendChild(element);
}
```

在 `main.js` 中并通过点击按钮来异步加载 `dynamic.js` 文件：

```js
const btn = document.createElement('button');
btn.textContent = 'click me';
document.body.appendChild(btn);
btn.addEventListener('click', () => {
  import('./dynamic').then((module) => {
    module.default();
  });
});
```

打包，并启动服务器，访问 `http://localhost:3000/` 地址：

![img24](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/img24.png)

点击按钮， `dynamic.js` 文件动态加载进来：

![img25](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/img25.png)

### 5. css extract

可以通过 `mini-css-extract-plugin` 插件将`CSS`带阿妈提取到一个单独的文件中。

首先，安装 `mini-css-extract-plugin` 插件：

```zsh
pnpm i mini-css-extract-plugin -D
```

然后，在 `webpack.config.js` 中配置 `mini-css-extract-plugin` 插件：

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // 配置 laoder
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(), // 配置 mini-css-extract-plugin 插件
  ],
};
```

这样即可将`CSS` 代码提取到单独的文件中。

### 6. css minimize

在进行生产模式打包时，`webpack` 只会将 `js`文件进行压缩，而不会对 `CSS` 文件进行压缩，对于 `CSS` 文件，可以通过 `optimize-css-assets-webpack-plugin` 插件来压缩打包后的 `CSS` 文件。

首先，安装 `optimize-css-assets-webpack-plugin` 插件：

```zsh
pnpm i optimize-css-assets-webpack-plugin -D
```

然后，在 `webpack.config.js` 中配置 `optimize-css-assets-webpack-plugin` 插件：

```js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // 配置 laoder
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(), // 配置 mini-css-extract-plugin 插件
    new OptimizeCSSAssetsPlugin(), // 配置 optimize-css-assets-webpack-plugin 插件
  ],
};
```

打包，`CSS` 文件可以被压缩。

当然也可以配置在 `optimization` 中的 `minimizer` 属性中，即只有开启了 `minimizer` 才会进行压缩：

```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'], // 配置 laoder
      },
    ],
  },
  optimization: {
    minimizer: [
      `...`, //  使用 `...` 语法，扩展现有的 minimizer，（即 `terser-webpack-plugin`）
      new OptimizeCSSAssetsPlugin(), // 配置 optimize-css-assets-webpack-plugin 插件
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(), // 配置 mini-css-extract-plugin 插件
  ],
};
```

这样就只有在生产模式下才会进行压缩，其他模式下不会进行压缩，和 `js` 代码保持一致。

### 7. hash

在生产模式下，`webpack` 会对生成的文件名进行哈希，这样可以让文件的过期时间设置长一些，文件名发生变化时，浏览器会重新请求文件，从而避免缓存问题。

可以通过 `output.filename` 配置项中的 `[hash]` 占位符来实现：

```js
module.exports = {
  entry: './src/main.js',
  output: {
    filename: '[name].[hash].js', // 使用 [hash] 占位符来生成哈希文件名
  },
};
```

`hash` 有三种：

**hash**

普通 `hash` 是项目级别的，每一个文件的 `hash` 都是相同，当有任何一个文件发生改变，整个项目的 `hash` 都会改变。

**chunkhash**

`chunkhash` 是 `chunk`级别的，`hash`，每一个 `chunk` 中的文件 `hash` 都是相同的，当某一个文件发生改变，对应的`chunk`下的每个文件的 `hash` 都会改变，不会影响到其他 `chunk`。

**contenthash**

`contenthash` 是文件级别的，`hash`，每一个文件中的内容 `hash` 都不相同，当文件内容发生改变，对应的文件的 `hash` 都会改变。
