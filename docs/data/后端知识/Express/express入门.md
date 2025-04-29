---
title: Express入门
desc: 掌握 Express 的基本使用,快速搭建一个后端服务
label:
  - Express
date: 2025-04-29
---

## 快速开始

1. 安装 Express

```zsh
pnpm i express
```

2. 创建 `app.js` 文件

```js
import express from 'express';

const PORT = 3000; // 用于设置端口号
const app = express(); // 创建一个express应用程序实例

// 创建一个 GET /hello 路由
app.get('/hello', (req, res) => {
  // 返回一个包含 "Hello World" 的 H1 标题的响应
  res.send('<h1>Hello World</h1>');
});

// 启动 Express 应用程序，监听在指定的端口上
app.listen(PORT, () => {
  // 在控制台输出服务器运行信息
  console.log(`Server is running at http://localhost:${PORT}`);
});
```

3. 运行 `app.js` 文件

```zsh
node app.js
```

4. 浏览器访问

浏览器打开 `http://localhost:3000/hello` 即可看到 "Hello World" 标题的响应。

## 常用方法

### 请求方法

通过 `app.get`、`app.post` 等方法可以创建不同的请求方法：

```js
app.METHOD(PATH, HANDLER);
```

- `app`: `express` 应用程序实例
- `METHOD`: 请求方法，如 `GET`、`POST`、`PUT`、`DELETE` 等
- `PATH`: 请求路径，如 `/hello`、`/:id` 等
- `HANDLER`: 请求处理函数，接收两个参数 `req` 和 `res`，分别代表请求和响应对象

示例：

```js
app.get('/api/get', (req, res) => {
  res.send('GET request');
});
app.post('/api/post', (req, res) => {
  res.send('POST request');
});
app.put('/api/put', (req, res) => {
  res.send('PUT request');
});
app.delete('/api/delete', (req, res) => {
  res.send('DELETE request');
});
```

### 请求参数

`express` 支持 `query`、`headers`、`body`、`params` 等参数，可以通过 `req` 对象获取：

- `req.query`: 查询参数，如 `http://localhost:3000/hello?name=John` 中的 `name=cas`
- `req.headers`: 请求头，如 `Content-Type`、`User-Agent` 等
- `req.body`: 请求体，如 `POST` 请求体中的数据
- `req.params`: 路径参数，如 `http://localhost:3000/hello/123` 中的 `:id`

示例：

```js
app.post('/api/user?name=cas', (req, res) => {
  const { query, headers, body, params } = req;
  console.log('query:', query);
  console.log('headers:', headers);
  console.log('body:', body);
  console.log('params:', params);
  res.send('hello cas');
});
```

注意，`req.body` 中的数据默认是无法解析的，需要开启相应的中间件才能解析：

- `application/json`格式的数据

```js
app.use(express.json());
```

- `application/x-www-form-urlencoded`格式的数据

```js
app.use(express.urlencoded({ extended: true })); // extended 为 true 时，解析多层嵌套的 JSON 数据
```

### 响应方法

`express` 提供了丰富的响应方法。

- `res.set()`

设置响应头。

```js
// 设置单个响应头
res.set('Content-Type', 'text/plain');

// 设置多个响应头
res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  ETag: '12345',
});
```

- `res.send()`

发送响应体，可以是字符串、JSON 对象、HTML 内容等

```js
res.send('<div>Hello World</div>');
```

- `res.json()`

发送 JSON 响应

```js
res.json({ message: 'Hello World' });
```

- `res.redirect()`

重定向到指定路径

```js
res.redirect('/login');
```

- `res.download()`

发送文件

```js
// 参数1: 文件路径
// 参数2: 下载后的文件名
// 参数3: 错误处理函数
res.download('/report-12345.pdf', 'report.pdf', err => {
  // 处理 err
});
```

- `res.status()`

设置响应状态码

```js
res.status(404).send('Not Found');
```

- `res.jsonp()`

发送 JSONP 响应.

默认使用 `callback` 参数作为回调函数名，可以通过`app.set()`来修改默认回调函数名。

```js
// 设置回调函数名
app.set('jsonp callback name', 'cb');

res.jsonp({ message: 'Hello World' });
```

### 中间件

`express` 提供了丰富的中间件，可以对请求和响应进行拦截、处理等操作。

中间件函数有三个参数：

- `req`：请求对象
- `res`：响应对象
- `next`：回调函数，调用 `next()` 会把请求传递给下一个中间件

```js
app.use((req, res, next) => {
  const { method, path } = req;
  console.log(`[${method}] ${path}`); // 打印请求信息
  next();
});
```

### 路由

使用 `express.Router` 可以创建路由，方便模块化开发。

```js
//router.js
import express from 'express';

// 创建路由实例
const router = express.Router();

router.get('/router/get', (req, res) => {
  res.send('GET router request');
});

router.post('/router/post', (req, res) => {
  res.send('POST router request');
});

// 导出路由
export default router;
```

```js
//app.js
import express from 'express';
import router from './router';

const app = express();

// 使用路由, 同时可以指定公共前缀
app.use('/api', router);

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
```

### 静态资源目录

可以通过 `express.static()` 方法设置静态资源目录。

```js
app.use(express.static('public'));

// 也可以给个前缀  /statit/public/a.png
app.use('/static', express.static('public'));
```

### 上传文件

上传文件可以使用 `multer` 库。

安装：

```zsh
pnpm i multer
```

编写上传逻辑：

```js
// 引入需要的模块
import express from 'express'; // 引入 Express 框架
import multer from 'multer'; // 引入 Multer 模块
import fs from 'fs'; // 引入 Node.js 文件系统模块

// 指定文件存储位置和文件名
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // 这里的 destination() 函数指定了文件存储的目录
    const dir = './uploads'; // './uploads' 为指定文件存储的目录
    if (!fs.existsSync(dir)) {
      // 如果该目录不存在，则创建该目录
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, './uploads'); // 将文件存储到指定目录
  },
  filename(req, file, cb) {
    // 这里的 filename() 函数指定了文件命名规则
    const ext = file.originalname.split('.').pop(); // 获取文件后缀名
    cb(null, `${Date.now()}-${file.fieldname}.${ext}`); // 将文件存储到指定位置，并以指定的文件名命名
  },
});
// 创建一个 multer 实例并配置相关选项
const upload = multer({
  storage, // 存储位置和文件名规则
  limits: {
    fileSize: 1024 * 1024 * 5, // 限制文件大小为 5 MB
  },
  fileFilter(req, file, cb) {
    // 这里的 fileFilter() 函数指定了文件类型过滤规则
    // 拒绝上传非图片类型的文件
    if (!file.mimetype.startsWith('image/')) {
      const err = new Error('Only image files are allowed!'); // 错误的具体信息
      err.status = 400; // 设置错误状态码为 400
      return cb(err, false);
    }
    return cb(null, true);
  },
});
// 处理文件上传请求
app.post('/upload/image', upload.single('file'), (req, res) => {
  // 这里的 upload.single() 函数指定了只上传单个文件
  res.json({ message: '文件上传成功', data: req.file }); // 返回上传成功的信息和上传的文件信息
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
```

关于 `multer` 更多的用法请参考[官方文档](https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md)。
