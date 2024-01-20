# js基础知识

## js中的数据类型

### 基本数据类型

es5之前有五种：`Null`、`Undefined`、`Boolean`、`Number`、`String`

es6之后新增两种：`Symbol`（独一无二的值）、`BigInt`（任意大的整数）

### 引用数据类型

`Object`类型, 包含`Object`、`Array`、`Function`、`Date`、`RegExp`、`Map`、`Set`等。

## null和undefined的区别

### 相同点

- `null`和`undefined`都是基本数据类型，都分别只有一个值`null`和`undefined`

- 在`if`语句中，`null`和`undefined`都会转换为`false`

- 两者在`==`运算中也相等，即:

```js
null == undefined  // true

// 但是两者都不等于false
null == false  // false
undefined == false  // false

```

### 不同点

- `null`表示空对象，也作为**对象原型的终点**，主要用于给一些变量赋初始值

- `undefined`表示未定义，一下情况下为`undefined`:

  - 定义了形参，未传递实参，则参数为`undefined`

  - 定义了变量，但未赋值，则变量为`undefined`

  - 对象属性名不存在，返回值为`undefined`

  - 函数没有返回值，则返回`undefined`