# Node.js（介绍）

## 一、Node.js 简介

`Node.js` 是一个免费、开源、跨平台的 JavaScript 运行时环境, 它让开发人员能够创建服务器 Web 应用、命令行工具和脚本。

## 二、Node.js 特点

1. **事件驱动与异步 IO**：`Node.js` 使用事件驱动模型，非阻塞 I/O 操作，可以高效的处理大量并发请求。

2. **跨平台**：`Node.js` 跨平台，可以在 Windows、Linux、Mac OS X 等操作系统上运行。

3. **JavaScript**：`Node.js` 使用 JavaScript 开发，具有 JavaScript 语言的全部特性。

4. **模块化**：`Node.js` 支持模块化，通过 `npm` 管理模块。

## 三、Node.js 安装

安装有两种方式：

- 官网直接下载安装包安装
- 使用 node 版本管理工具安装

这里介绍下 `node` 版本管理工具安装，这里以 `nvm` 为例。

安装 nvm：

`Mac & Linux`:

```zsh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

`Windows`:

[nvm-windows](https://github.com/coreybutler/nvm-windows) 下载安装包安装。

安装 Node.js：

```zsh
nvm install v22.14.0
```

查看 Node.js 版本：

```zsh
nvm ls
```

切换 Node.js 版本：

```zsh
nvm use v18.16.0
```

更多指令可以去[官方文档](https://github.com/nvm-sh/nvm#usage)查阅
