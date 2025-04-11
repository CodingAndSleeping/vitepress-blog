# Nodejs（process）

`process` 模块提供了一些用于获取当前 Node.js 进程的信息的方法。并且是全局变量，可以直接使用。

## process.arch

返回当前 CPU 架构。和 `os.arch()` 一样，并且 `process.arch` 是只读属性。

## process.cwd()

返回当前文件所在的工作目录。

## process.argv

返回一个数组，包含了 `Node.js` 进程启动时传入的命令行参数。第一个元素是 `Node.js` 可执行文件的路径，第二个元素开始是用户传入的参数。

## process.memoryUsage()

返回一个对象，包含了当前进程内存使用情况。

```javascript
{
  rss: 32923648,
  heapTotal: 7757824,
  heapUsed: 5141136,
  external: 918804,
  arrayBuffers: 338139
}
```

- `rss`: 进程总内存使用量，以字节为单位。
- `heapTotal`: V8 引擎堆的总内存使用量，以字节为单位。
- `heapUsed`: V8 引擎堆的使用量，以字节为单位。
- `external`: 进程使用到的外部内存，以字节为单位。
- `arrayBuffers`: 指分配给 `ArrayBuffers` 和 `SharedArrayBuffers` 的内存。

## process.exit()

退出当前 Node.js 进程。即使有仍未完成的异步操作，也会退出。

## process.kill(id)

杀死进程。接收一个参数 `id`, `id` 是进程的 `PID`，可以通过 `process.pid` 获取。

## process.env

用来读取系统的所有环境变量。可以修改环境变量，但不会真正影响系统环境变量，只是在当前进程中临时修改。

使用 `cross-env` 包，可以跨平台设置环境变量。

```bash
npm install cross-env -D
```

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development node index.js",
    "build": "cross-env NODE_ENV=production node index.js"
  }
}
```

原理：

- 命令重写 ​​：当你在 package.json 中使用 cross-env 时，它会根据当前运行的操作系统，将命令转换为适合该平台的语法。
- 子进程执行 ​​：cross-env 会创建一个子进程，在该进程中设置环境变量，然后执行后续命令。
- 平台适配 ​​：
- 在 Unix-like 系统（Linux/macOS）上，直接使用 KEY=value command 语法
- 在 Windows 上，使用 SET KEY=value && command 语法
