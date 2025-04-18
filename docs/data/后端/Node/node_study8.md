---
title: Nodejs（events）
desc: 基于事件驱动的编程模型。
label:
  - Node
date: 2025-04-10
---

# Nodejs（events）

`events` 模块提供了基于事件驱动的编程模型。

`Nodejs` 中的核心 API 都是才用的这种事件模型。通过监听事件的变化，来执行对应的回调函数

## 事件模型

`Nodejs` 事件模型采用了发布订阅的设计模式。

具体案例：

```javascript
import { EventEmitter } from 'events';

const myEmitter = new EventEmitter();

myEmitter.on('event', (data) => {
  console.log(data);
});

myEmitter.emit('event', 'Hello World');
```

默认监听的事件数量最多为 10 个，如果想要解除限制，可以调用 `setMaxListeners` 方法解除限制：

```javascript
import { EventEmitter } from 'events';

const myEmitter = new EventEmitter();

myEmitter.setMaxListeners(20);
```

通过调用 `off` 方法可以解除事件监听：

```javascript
myEmitter.off('event', (data) => {
  console.log(data);
});
```
