---
title: 数组元素非自身乘积
desc: 手动实现数组元素非自身乘积。
label:
  - javascript
  - 手撕代码
date: 2025-04-13
---

## 数组元素非自身乘积

给定一个整数数组 `nums`，返回一个数组 `answer`，其中 `answer[i]`等于`nums`中除`nums[i]`之外其余各元素的乘积。

```javascript
function productExceptSelf(nums) {
  let answers = new Array(nums.length).fill(1);

  let left = 1;
  for (let i = 0; i < nums.length; i++) {
    answers[i] = answers[i] * left;
    left = nums[i] * left;
  }

  let right = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    answers[i] = answers[i] * right;
    right = nums[i] * right;
  }

  return answers;
}

console.log(productExceptSelf([1, 2, 3, 4])); // [ 24, 12, 8, 6 ]
```
