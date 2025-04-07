## 手写 lazyBoy

```javascript
function lazyBoy(name) {
  class LazyBoy {
    tasks = [];

    constructor(name) {
      this.tasks.push(() => {
        console.log(`我是${name}`);
        this.run();
      });

      setTimeout(() => {
        this.run();
      }, 0);
    }

    run() {
      const task = this.tasks.shift();
      task && task();
    }

    eat(food) {
      this.tasks.push(() => {
        console.log(`我正在吃${food}`);
        this.run();
      });

      return this;
    }

    sleep(time) {
      this.tasks.push(() => {
        setTimeout(() => {
          console.log(`我睡了${time}秒`);
          this.run();
        }, time * 1000);
      });

      return this;
    }

    sleepFirst(time) {
      this.tasks.unshift(() => {
        setTimeout(() => {
          console.log(`我睡了${time}秒`);
          this.run();
        }, time * 1000);
      });

      return this;
    }
  }

  return new LazyBoy(name);
}
```
