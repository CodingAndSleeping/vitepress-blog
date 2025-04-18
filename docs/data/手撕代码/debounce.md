---
title: 手写防抖
desc: 手动实现防抖函数。
label:
  - javascript
  - 手撕代码
date: 2022-07-18
---

## 手写防抖

### debounce

```js
// 防抖函数，接收两个参数，一个是要执行的函数，另一个是延迟时间
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  };
}
```
