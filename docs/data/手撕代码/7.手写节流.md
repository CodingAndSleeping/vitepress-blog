---
title: 手写节流
desc: 手动实现节流函数。
label:
  - javascript
  - 手撕代码
date: 2022-07-18
---

## 手写节流

### throttle

```js
// 定时器版节流函数，接收一个函数和一个延迟时间
function throttle(fn, delay) {
  let flag = false;
  return function (...args) {
    if (flag) return;
    flag = true;
    setTimeout(() => {
      fn.call(this, ...args);
      flag = false;
    }, delay);
  };
}

// 时间戳版节流函数，接收一个函数和一个延迟时间
function throttle(fn, delay) {
  // 初始时间为0
  let time = 0;
  return function (...args) {
    // 获取当前时间戳
    let now = new Date().valueOf();
    // 判断当前时间减去上一时间是否大于延迟时间间隔
    if (now - time >= delay) {
      // 执行fn函数，改变函数的this指向，并传递参数
      fn.call(this, ...args);
      // 让time等于当前时间
      time = now;
    }
  };
}
```
