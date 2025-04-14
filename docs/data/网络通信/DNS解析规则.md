# DNS 解析规则

当用户在浏览器地址栏输入 URL 并按下回车键时，浏览器首先会对域名进行 DNS 解析，将域名转换为 IP 地址。

DNS 查询顺序如下：

1. 浏览器自身 DNS 缓存
2. 操作系统 DNS 缓存
3. 本地 hosts 文件(域名 和 IP 映射)
4. 域名服务器查找

如果有任何一步找到 IP 地址，则停止查询，否则，继续查询下一步。

### 浏览器自身 DNS 缓存

浏览器自身 DNS 缓存是浏览器内置的 DNS 缓存，浏览器会在本地缓存 DNS 解析结果，以提高解析效率。

具体可以通过访问 `edge(或chrome)://net-internals/#dns` 页面查看浏览器 DNS 缓存。

![20250414210853](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/20250414210853.png)

### 操作系统 DNS 缓存

操作系统 DNS 缓存是操作系统内置的 DNS 缓存，不同操作系统的 ​​DNS 缓存存储位置和管理方式有所不同。

### 本地 hosts 文件映射

本地 hosts 文件在 macOS 中位于 `/private/etc/hosts` 文件中，在 Windows 中位于 `C:\Windows\System32\drivers\etc\hosts` 文件中。

接下来以 macOS 为例，演示本地 hosts 文件的配置。

首先在终端中输入 `sudo vim /private/etc/hosts`，打开 hosts 文件进行编辑。

可以看到里面已经存在一些映射规则：

![20250414212120](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/20250414212120.png)

例如：`127.0.0.1 localhost`，表示将域名 `localhost` 映射到 IP 地址 `127.0.0.1`。这也就是为什么在浏览器输入 `localhost` 时，可以直接访问本地 IP 地址的原因。

在最后加入一条：`127.0.0.1 codingandsleeping.com`，表示将域名 `codingandsleeping.com` 映射到 IP 地址 `127.0.0.1`。

然后启动一个本地服务器

```javascript
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
```

访问 `http://codingandsleeping.com:3000/` 即可看到 `Hello World!`。

### 向域名服务器查询

如果本地 hosts 文件中没有找到对应的 IP 地址，则浏览器会向域名服务器查询。

查找顺序如下：

1. 本地 DNS 服务器
2. 根域名服务器: `.`
3. 顶级域名服务器: `com.`
4. 权威域名服务器: `baidu.com.`

最后，当 DNS 解析完成，就可以向目标 IP 地址发送 HTTP 请求了。
