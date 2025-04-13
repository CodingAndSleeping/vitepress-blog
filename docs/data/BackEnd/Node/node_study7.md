# Nodejs（child_process）

`child_process` 模块提供了创建子进程的方法。

主要包括：

- `exec`
- `execSync`
- `execFile`
- `execFileSync`
- `spawn`
- `spawnSync`
- `fork`

其中，带 `Sync` 字样的方法是同步方法，不带的是异步方法。

## 1. exec 和 execSync

`exec` 和 `execSync` 方法可以用来执行 shell 命令。

### 1）exec

`exec` 方法接收三个参数：

- `command`：要执行的 shell 命令。
- `options`：可选参数，用于设置执行选项。
- `cwd`：执行命令的当前工作目录。
- `env`：环境变量键值对，默认为 `process.env`。
- `encoding`：编码，默认为 `utf8`。
- `shell`：用于执行命令的 shell 路径，windows 下默认为 `process.env.ComSpec`，linux 下默认为 `/bin/sh`。
- `timeout`：超时时间，单位为毫秒，默认为 0。
- `maxBuffer`：标准输出或标准错误允许的最大数据量（以字节为单位）。如果超出，则终止子进程并截断任何输出。
- `killSignal`：杀死子进程的信号。默认为 `SIGTERM`。
- `uid`：设置用户 id。
- `gid`：设置组 id。
- `windowsHide`：隐藏在 Windows 系统上创建的子进程控制台窗口。默认值: `false`。
- `callback`：回调函数，用于接收执行结果。参数有三个：`error`, `stdout`, `stderr`。

```javascript
import { exec } from 'child_process';

exec('node -v', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`); // stdout: v22.14.0
  console.log(`stderr: ${stderr}`); // stderr:
});
```

### 2）execSync

`execSync` 方法是 `exec` 方法的同步版本。`javascript` 代码会等待子进程执行完成，并返回执行结果。因此没有第三个参数 `callback`。

```javascript
import { execSync } from 'child_process';

try {
  const stdout = execSync('node -v');
  console.log(`stdout: ${stdout}`); // stdout: v22.14.0
} catch (error) {
  console.error(`exec error: ${error}`);
}
```

## 2. execFile 和 execFileSync

`execFile` 和 `execFileSync` 方法可以用来执行可执行文件。

### 1）execFile

`execFile` 方法接收三个参数：

- `file`：要执行的可执行文件路径。
- `args`：可选参数，用于设置执行参数。
- `options`：可选参数，用于设置执行选项。
- `cwd`：执行命令的当前工作目录。
- `env`：环境变量键值对，默认为 `process.env`。
- `encoding`：编码 默认为 `utf8`。
- `timeout`：超时时间，单位为毫秒，默认为 0。
- `maxBuffer`：标准输出或标准错误允许的最大数据量（以字节为单位）。如果超出，则终止子进程并截断任何输出。
- `killSignal`：杀死子进程的信号。默认为 `SIGTERM`。
- `uid`：设置用户 id。
- `gid`：设置组 id。
- `windowsHide`：隐藏在 Windows 系统上创建的子进程控制台窗口。默认值: `false`。
- `shell`：用于执行命令的 shell 路径，windows 下默认为 `process.env.ComSpec`，linux 下默认为 `/bin/sh`。
- `signal`：允许使用 `AbortSignal` 终止子进程。
- `callback`：回调函数，用于接收执行结果。参数有三个：`error`, `stdout`, `stderr`。
