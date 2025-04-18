---
title: 红绿灯
desc: 红灯亮三秒，黄灯亮两秒，绿灯亮一秒，循环往复。
label:
  - javascript
  - 手撕代码
date: 2025-04-10
---

## 红绿灯

红灯亮三秒，黄灯亮两秒，绿灯亮一秒，循环往复。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .light {
        background-color: #f0f0f0;
        height: 1rem;
        width: 1rem;
        border-radius: 50%;
        border: 1px solid #000;
        margin: 1rem;
      }

      .red.active {
        background-color: red;
      }
      .yellow.active {
        background-color: yellow;
      }
      .green.active {
        background-color: green;
      }
    </style>
  </head>
  <body>
    <div id="red" class="light red"></div>
    <div id="yellow" class="light yellow"></div>
    <div id="green" class="light green"></div>

    <script>
      function updateLight(color) {
        document.querySelectorAll('.light').forEach((light) => {
          light.classList.remove('active');
        });

        document.getElementById(color).classList.add('active');
      }

      function delay(time) {
        return new Promise((reslove) => {
          setTimeout(() => {
            reslove();
          }, time * 1000);
        });
      }
      async function run() {
        while (true) {
          updateLight('red');
          await delay(3);
          updateLight('yellow');
          await delay(2);
          updateLight('green');
          await delay(1);
        }
      }
      run();
    </script>
  </body>
</html>
```
