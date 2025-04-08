## 洗牌算法

```javascript
function durstenfeldShuffle(array) {
  for (let i = 0; i < array.length - 1; i++) {
    const j = i + Math.floor(Math.random() * (array.length - i));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
```
