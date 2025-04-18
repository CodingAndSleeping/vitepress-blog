---
title: 多维数组扁平化
desc: 多维数组扁平化。
label:
  - javascript
  - 手撕代码
date: 2025-04-14
---

## 多维数组扁平化

```javascript
function flattenArr(arr) {
  return arr.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flattenArr(cur) : cur);
  }, []);
}

console.log(flattenArr([1, [2, 3, [4]], 5])); // [ 1, 2, 3, 4, 5 ]
```
