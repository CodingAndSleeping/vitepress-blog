---
title: Vue源码学习（computed）
desc: Vue源码学习之 computed 的实现。
label:
  - 源码学习
  - Vue
date: 2025-05-12
---

## 前言

这节主要来讲一下 `vue` 中计算属性 `computed` 的实现。

## computed

```typescript
export function computed(getterOrOptions) {
  const onlyGetter = isFunction(getterOrOptions);

  let getter;
  let setter;

  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {};
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }

  return new ComputedRefImpl(getter, setter);
}
```

`computed` 函数有两种传参方式，一种是传递一个函数，另一种是传递一个对象，对象中包含 `get` 和 `set` 方法。

因此，在 `computed` 函数中，我们先判断是否传递的是一个函数，如果是，则将其作为 `getter` 函数，`setter` 函数设置为一个为空函数。如果不是函数，则将参数中的 `get` 方法作为 `getter` 函数，`set` 方法作为 `setter` 函数。

然后，创建一个 `ComputedRefImpl` 对象，并将 `getter` 函数和 `setter` 函数作为参数传入。

我们看一下 `ComputedRefImpl` 的实现：

```typescript
class ComputedRefImpl {
  public _value;

  public _effect: ReactiveEffect;

  public _dirty = true; // 标记当前的计算属性是否是脏的，如果是脏的，需要重新计算

  public dep;

  constructor(public getter, public setter) {
    this.dep = createDep(() => (this.dep = void 0));

    this._effect = new ReactiveEffect(
      () => getter(this._value),
      () => {
        // compoted 本身是一个 effect 函数，当它依赖的值发生变化时，就会触发这个 scheduler
        // 如果这个值是不脏的，触发更新需要将值变为脏值
        // 目的是为了让依赖这个计算属性的 effect 函数在执行期间访问计算属性时，重新计算获取新的值
        if (!this._dirty) {
          this._dirty = true;
        }

        // 计算属性的所依赖的值发生变化，那么依赖了计算属性的 effect 函数的需要重新执行
        triggerRefValue(this);
      }
    );
  }

  get value() {
    // 这里收集的是 effect 与 计算属性的依赖关系
    trackRefValue(this);

    // 如果 effect 身上的 dirty 属性是 true，说明计算属性的值需要重新计算
    if (this._dirty) {
      // 将 dirty 置为 false
      this._dirty = false;

      // 调 run 方法 相当于 调 getter 函数  ，重新计算属性的值
      // run方法执行期间 会让 getter 函数 与 计算属性所依赖的值 建立依赖关系
      // 并将 计算属性所依赖的值 标记为脏值
      this._value = this._effect.run();
    }

    // 返回 _value
    return this._value;
  }

  set value(newValue) {
    this.setter(newValue);
  }
}
```

先来看一下 `ComputedRefImpl` 身上的属性：

- `_value`：存储计算属性的值。
- `_effect`：存储计算属性自身的 `effect` 函数。计算属性本身也相当于一个 `effect` 函数，当它依赖的值发生变化时，就会触发这个 `effect` 的 `scheduler`。
- `_dirty`：标记当前的计算属性是否是脏的，如果是脏的，需要重新计算。这个属性就是用来判断是否是需要重新计算的一个标志。
- `dep`：用于收集依赖。由于计算属性所得到的值类始于一个 `ref` 对象，因此，它也可以与其他的 `effect` 函数建立依赖关系。
- `getter`：计算属性的 `getter` 函数。
- `setter`：计算属性的 `setter` 函数。

这里面有一些属性并不是那么好理解，我们来具体看一下这个类里面的函数：

`constructor` 构造函数：

```typescript
this.dep = createDep(() => (this.dep = void 0));
```

首先，创建了一个 `dep` 对象，用于收集依赖。

```typescript
this._effect = new ReactiveEffect(
  () => getter(this._value),
  () => {
    // compoted 本身是一个 effect 函数，当它依赖的值发生变化时，就会触发这个 scheduler
    // 如果这个值是不脏的，触发更新需要将值变为脏值
    // 目的是为了让依赖这个计算属性的 effect 函数在执行期间访问计算属性时，重新计算获取新的值
    if (!this._dirty) {
      this._dirty = true;
    }

    // 计算属性的所依赖的值发生变化，那么依赖了计算属性的 effect 函数的需要重新执行
    triggerRefValue(this);
  }
);
```

然后，创建一个 `ReactiveEffect` 对象，对这个类不熟悉的可以去看一下 `reactivity` 那一节。`ReactiveEffect` 类接收两个参数，一个 `fn` 函数和一个 `scheduler` 调度函数，将 `getter` 函数和 `scheduler` 函数作为参数传入。

`getter` 函数可以接受一个 `previous` 作为参数，这个参数是上一次计算属性的值。这里把 `this._value` 作为 `previous` 参数传入。

`scheduler` 函数会在计算属性所依赖的值发生变化时被调用，由于依赖的值发生了变化，因此，需要重新计算计算属性的值，因此，当计算属性的值不是脏的时，那么就将 `_dirty` 置为 `true`，下次读取计算属性的值时就会重新计算。

然后调用 `triggerRefValue` 函数，这是为了让依赖这个计算属性的 `effect` 函数重新执行。

`get value` 函数：

```typescript
 get value() {
    // 这里收集的是 effect 与 计算属性的依赖关系
    trackRefValue(this)

    // 如果 effect 身上的 dirty 属性是 true，说明计算属性的值需要重新计算
    if (this._dirty) {
      // 将 dirty 置为 false
      this._dirty = false

      // 调 run 方法 相当于 调 getter 函数  ，重新计算属性的值
      // run方法执行期间 会让 getter 函数 与 计算属性所依赖的值 建立依赖关系
      // 并将 计算属性所依赖的值 标记为脏值
      this._value = this._effect.run()
    }

    // 返回 _value
    return this._value
  }
```

`get value` 函数主要做了以下事情：

首先收集了计算属性与其他`effect` 函数的依赖关系。

然后判断 `this._dirty` 属性是否为 `true`，如果为 `true`，说明计算属性的值需要重新计算。调用一遍 `effect` 身上的 `run` 方法，重新计算计算属性的值，然后还需要将 `_dirty` 置为 `false`。

最后返回 `this._value`。

`set value` 函数：

```typescript
set value(newValue) {
  this.setter(newValue)
}
```

`set value` 函数只是调用了 `setter` 函数。

上面理解起来还是有点难度，下面用一个例子来讲一下：

```typescript
const obj = reactive({ count: 0 });
const computedValue = computed(() => obj.count * 2);

effect(() => {
  console.log(computedValue.value);
});
```

这里面有两个依赖关系：

- `() => obj.count * 2` 这个函数依赖了 `obj.count`

- `() => { console.log(computedValue.value)}`这个函数依赖了 `computedValue.value`

当 `obj.count` 发生变化时，`computedValue` 也会发生变化，因此，就会调用 `scheduler` 函数来通知 `() => { console.log(computedValue.value)}` 这个函数重新执行。

当在函数执行期间，访问了 `computedValue.value`，就会被 `get` 方法拦截，进行一个依赖的收集，并返回计算属性的值。

这就是 `computed` 的实现过程。
