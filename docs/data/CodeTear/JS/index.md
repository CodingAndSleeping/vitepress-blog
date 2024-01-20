## 手写 instanceof

```js
function myInstanceOf(target, origin) {
  // 循环遍历目标对象的原型链
  while (target) {
    // 判断target的原型是否是origin的实例对象
    if (target.__proto__ === origin.prototype) {
      // 是，则返回true
      return true
    }
    // 否则让target等于其原型
    target = target.__proto__
  }
  // 若target的原型不存在了，则返回false
  return false
}

// 测试
let a = [1, 2, 3]
console.log(myInstanceOf(a, Array)) // true
console.log(myInstanceOf(a, Object)) // true
console.log(myInstanceOf(a, Number)) // false
```

## 手写 bind/apply/call

### bind

```js
Function.prototype.myBind = function (context, ...args1) {
  // bind并不会立即调用而是返回一个函数，并且可以多次传参
  return (...args2) => {
    // 如果改变的指向为null或undefined，则指向window
    context = context || window
    //  将this指向的函数（即调用myBind函数的函数）赋值给context对象的一个属性
    context.fn = this
    // 用context来调用该函数，那么该函数中的this则指向context
    let result = context.fn(...args1, ...args2)
    // 删除context中的fn属性
    delete context.fn
    // 返回 result（即该箭头函数）
    return result
  }
}

// 测试
let obj = {
  name: 'lzt',
}

function fn(a, b, c) {
  console.log(this.name, a, b, c)
}

fn(1, 2, 3) // undefined 1 2 3

let newFn = fn.myBind(obj, 1, 2)
newFn(3) // lzt 1 2 3
```

### apply

```js
Function.prototype.myApply = function (context, args) {
  // 如果改变的指向为null或undefined，则指向window
  context = context || window
  //  将this指向的函数（即调用myApply函数的函数）赋值给context对象的一个属性
  context.fn = this
  // 用context来调用该函数，那么该函数中的this则指向context
  let result = context.fn(...args)
  // 删除context中的fn属性
  delete context.fn
  // 返回 result
  return result
}

// 测试
let obj = {
  name: 'lzt',
}

function fn(a, b, c) {
  console.log(this.name, a, b, c)
}

fn(1, 2, 3) // undefined 1 2 3

fn.myApply(obj, [1, 2, 3]) // lzt 1 2 3
```

### call

```js
Function.prototype.myCall = function (context, ...args) {
  // 如果改变的指向为null或undefined，则指向window
  context = context || window
  //  将this指向的函数（即调用myCall函数的函数）赋值给context对象的一个属性
  context.fn = this
  // 用context来调用该函数，那么该函数中的this则指向context
  let result = context.fn(...args)
  // 删除context中的fn属性
  delete context.fn
  // 返回 result
  return result
}

// 测试
let obj = {
  name: 'lzt',
}

function fn(a, b, c) {
  console.log(this.name, a, b, c)
}

fn(1, 2, 3) // undefined 1 2 3

fn.myCall(obj, 1, 2, 3) // lzt 1 2 3
```

## 手写 new

```js
function myNew(Fn, ...args) {
  // 定义一个空对象
  let obj = {}
  // 将这个空对象的原型等于构造函数的原型对象
  obj.__proto__ = Fn.prototype
  // 改变构造函数this指向，指向这个空对象，并执行构造函数里的代码
  let result = Fn.apply(obj, args)
  // 判断构造函数的返回值是否是个对象，若是，则返回这个对象，若不是，则返回定义的空对象
  return result instanceof Object ? result : obj
}

// 测试
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.say = function () {
  console.log(this.name, this.age)
}

let p = myNew(Person, 'lzt', '3')
p.say() // lzt 3
```

## 手写 promise

```js
class myPromise {
  constructor(executor) {
    // promise有三个状态，分别为pending，fulfilled和rejected，初始状态为pending
    this.state = 'pending'
    // 定义一个变量用来保存成功或失败的值
    let value = null
    // 成功后的回调函数数组，实现promise的同步作用
    this.onResolveCallbacks = []
    // 失败后的回调函数数组
    this.onRejectedCallbacks = []
    // resolve函数
    let reslove = res => {
      // 加一个定时器使其变成异步函数
      setTimeout(() => {
        if (this.state == 'pending') {
          // 判断状态是否为 pending
          // 状态修改为 fulfilled
          this.state = 'fulfilled'
          // value值修改为传入的值
          this.value = res
          // 执行成功后的回调函数数组里的每个函数
          this.onResolveCallbacks.forEach(fn => fn())
        }
      }, 0)
    }
    // reject函数
    let reject = err => {
      // 加一个定时器使其变成异步函数
      setTimeout(() => {
        if (this.state == 'pending') {
          // 判断状态是否为 pending
          // 状态修改为 rejected
          this.state = 'rejected'
          // value值修改为传入的值
          this.value = err
          // 执行失败后的回调函数数组里的每个函数
          this.onRejectedCallbacks.forEach(callback => callback())
        }
      }, 0)
    }
    // 捕捉executor里的错误
    try {
      // 执行executor函数
      executor(reslove, reject)
    } catch (error) {
      // 有错误则执行reject函数
      reject(error)
    }
  }

  // then函数
  then(onFulfilled, onRejected) {
    // 判断传进来的参数是否是函数，如果不是则赋值一个空函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => {}
    onRejected = typeof onRejected === 'function' ? onRejected : () => {}
    // 返回一个新的myPromise对象
    return new myPromise((reslove, reject) => {
      if (this.state == 'fulfilled') {
        // 判断状态是否是fulfilled
        // 使其异步
        setTimeout(() => {
          try {
            // 执行onFulfilled函数，并接收返回值
            const res = onFulfilled(this.value)
            // 将返回值作为新promise中的reslove函数的参数
            reslove(res)
          } catch (err) {
            reject(err)
          }
        }, 0)
      }

      if (this.state == 'rejected') {
        // 判断状态是否是rejected
        // 使其异步
        setTimeout(() => {
          try {
            // 执行onRejected函数，并接收返回值
            const err = onRejected(this.value)
            // 将返回值作为新promise中的reject函数的参数
            reject(err)
          } catch (err) {
            reject(err)
          }
        }, 0)
      }

      if (this.state == 'pending') {
        // 判断状态是否是pending
        // 成功回掉函数数组里传入一个函数，函数里执行onFulfilled函数, 这个函数会在reslove函数执行时再执行
        this.onResolveCallbacks.push(() => {
          try {
            // 执行onFulfilled函数，并接收返回值
            const res = onFulfilled(this.value)
            // 将返回值作为新promise中的reslove函数的参数
            reslove(res)
          } catch (err) {
            reject(err)
          }
        })

        this.onRejectedCallbacks.push(() => {
          try {
            // 执行onRejected函数，并接收返回值
            const err = onRejected(this.value)
            // 将返回值作为新promise中的reject函数的参数
            reject(err)
          } catch (err) {
            reject(err)
          }
        })
      }
    })
  }

  // catch函数，catch函数本质就是then函数的第一个参数为空
  catch(onRejected) {
    return this.then(null, onRejected)
  }

  // finally函数
  finally(fn) {
    return this.then(
      res => {
        fn()
        return res
      },
      err => {
        fn()
        return err
      }
    )
  }
}

// Promise.reslove方法， 返回一个成功的promise对象
myPromise.reslove = value => {
  return new myPromise((reslove, reject) => {
    reslove(value)
  })
}

// Promise.reject方法，返回一个失败的promise对象
myPromise.reject = value => {
  return new myPromise((reslove, reject) => {
    reject(value)
  })
}

// Promise.all方法，当所有的promise都成功，才返回成功结果的数组，有一个失败就返回失败的结果
myPromise.all = promises => {
  return new myPromise((reslove, reject) => {
    let count = 0
    let resArr = []
    for (let i = 0; i < promises.length; i++) {
      if (!(promises[i] instanceof myPromise)) {
        // 判断数组里的每一项是否是myPromise对象，如果不是则直接包装成一个成功的myPromise对象
        promises[i] = myPromise.reslove(promises[i])
      }
      promises[i].then(
        res => {
          count++
          resArr[i] = res
          if (count == promises.length) {
            reslove(resArr)
          }
        },
        err => {
          reject(err)
        }
      )
    }
  })
}

// Promise.race方法, 谁先有结果谁就先返回
myPromise.race = promises => {
  return new myPromise((reslove, reject) => {
    for (let i = 0; i < promises.length; i++) {
      if (!(promises[i] instanceof myPromise)) {
        // 判断数组里的每一项是否是myPromise对象，如果不是则直接包装成一个成功的myPromise对象
        promises[i] = myPromise.reslove(promises[i])
      }
      promises[i].then(
        res => {
          reslove(res)
        },
        err => {
          reject(err)
        }
      )
    }
  })
}

// 测试
console.log('第一步')
new myPromise((reslove, reject) => {
  setTimeout(() => {
    reslove('成功了')
    reject('失败了')
    console.log('第三步')
  }, 1000)
})
  .then(
    res => {
      console.log(res)
      throw new Error('出错了！')
    },
    err => {
      console.log(err)
      return err
    }
  )
  .then(
    res => {
      console.log(res)
    },
    err => {
      console.log('错误是：' + err.message)
    }
  )
console.log('第二步')
/*
    第一步
    第二步
    第三步
    成功了
    错误是：出错了！
*/

let p1 = new myPromise((reslove, reject) => {
  setTimeout(() => {
    reslove(1)
  }, 1000)
})
let p2 = myPromise.reslove(2)
let p3 = myPromise.reject(3)

myPromise.all([p1, p2, p3]).then(
  res => {
    console.log(res)
  },
  err => {
    console.log(err)
  }
)
// 3

myPromise.race([p1, p2, p3]).then(
  res => {
    console.log(res)
  },
  err => {
    console.log(err)
  }
)
// 2
```

## 实现深拷贝

```js
function deepClone(obj) {
  // 判断传入的是否是引用类型或者null，如果不是引用类型或者是null，则直接返回
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  // 定义一个新对象
  let newObj
  // 判断传进来的是数组还是对象
  if (obj instanceof Array) {
    // 是数组就给newObj赋值一个空数组
    newObj = []
  } else {
    // 是对象就给newObj赋值一个空对象
    newObj = {}
  }
  // 循环遍历对象上的key
  for (let key in obj) {
    // 判断是否是对象本身上的key，对象原型身上的key不进行拷贝
    if (obj.hasOwnProperty(key)) {
      // 递归调用deepClone
      newObj[key] = deepClone(obj[key])
    }
  }
  // 返回这个新对象
  return newObj
}

// 测试
let obj = {
  name: 'lzt',
  hobbies: ['sleep', 'code'],
  friends: {
    name: 'lzt2',
    age: 3,
  },
}

newObj = deepClone(obj)
console.log(obj)
console.log(newObj)

// {
//     name: 'lzt',
//     hobbies: ['sleep', 'code'],
//     friends: { name: 'lzt2', age: 3 }
// }
// {
//     name: 'lzt',
//     hobbies: ['sleep', 'code'],
//     friends: { name: 'lzt2', age: 3 }
// }

newObj.hobbies.push('eat')
newObj.friends.age = 5
console.log(obj)
console.log(newObj)

// {
//     name: 'lzt',
//     hobbies: [ 'sleep', 'code' ],
//     friends: { name: 'lzt2', age: 3 }
// }
// {
//     name: 'lzt',
//     hobbies: [ 'sleep', 'code', 'eat' ],
//     friends: { name: 'lzt2', age: 5 }
// }
```

## 手写防抖节流(debounce/throttle)

### debounce

```js
// 防抖函数，接收两个参数，一个是要执行的函数，另一个是延迟时间
function debounce(fn, delay) {
  // 定义一个空的变量
  let timer = null
  // 返回一个函数
  return function () {
    // 判断timer是否为空
    if (timer) {
      // 如果不为空，则清除定时器timer
      clearTimeout(timer)
    }
    // 给timer赋值一个定时器
    timer = setTimeout(() => {
      // 执行fn函数，改变函数的this指向，并传递参数
      fn.apply(this, arguments)
    }, delay)
  }
}
```

## throttle

```js
// 定时器版节流函数，接收一个函数和一个延迟时间
function throttle(fn, delay) {
  // 定义一个初始状态，为false
  let flag = false
  // 返回一个函数
  return function () {
    // 如果flag为true，则直接返回，不再往下执行
    if (flag) return
    // 修改flag为true
    flag = true
    // 设置定时器
    setTimeout(() => {
      // 执行fn函数，改变函数的this指向，并传递参数
      fn.apply(this, arguments)
      // 修改flag为false
      flag = false
    }, delay)
  }
}

// 时间戳版节流函数，接收一个函数和一个延迟时间
function throttle(fn, delay) {
    // 初始时间为0
    let time = 0;
    return function () {
        // 获取当前时间戳
        let now = new Date().valueOf();
        // 判断当前时间减去上一时间是否大于延迟时间间隔
        if (now - time >= delay) {
            // 执行fn函数，改变函数的this指向，并传递参数
            fn.apply(this, arguments);
            // 让time等于当前时间
            time = now;
        }
    }
}
```
