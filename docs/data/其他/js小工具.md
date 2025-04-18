---
title: JS小工具
desc: 一些常用的JS小工具。
label:
  - javascript
data: 2023-11-10
---

## 计算一行文本的宽度

```js
/**
 * 计算文本宽度
 * @param {String} text 文本
 * @param {Number} buffer 缓冲距离
 * @param {Number} fontSize 字体大小
 * @returns 文本宽度
 */

function (text: string, buffer = 100, fontSize = 16): string {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = fontSize + "px Microsoft YaHei";
  return `${ctx.measureText(text).width + buffer}px`;
}
```

## 文件下载导出

```js
/**
 * 文件下载导出
 * @param {String} buffer 二进制数据
 * @param {String} fileName 文件名称
 */

function downloadFileByBuffer(buffer: string, fileName: string): void {
  const url = window.URL.createObjectURL(
    new Blob([buffer], { type: 'application/octet-stream;charset=GBK' }),
  );
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', decodeURIComponent(fileName));
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
```

## 过万的数字转为万、亿、万亿结尾

```js
/**
 * 过万的数字转为万、亿、万亿结尾
 * @param {Number} value 数字
 * @returns {Object} 数字和单位组成的对象
 */
function numberFormat(value) {
  const param: { value?: number | string, unit?: string } = {
    value: 0,
    unit: '',
  };
  const k = 10000;
  const sizes = ['', '万', '亿', '万亿'];
  let i;
  if (value < k) {
    param.value = value;
    param.unit = '';
  } else {
    i = Math.floor(Math.log(value) / Math.log(k));
    param.value = (value / Math.pow(k, i)).toFixed(2);
    param.unit = sizes[i];
  }
  return param;
}
```

## 时间戳转换为距离当前多长时间

```js
/**
 * 时间戳转换为距离当前多长时间
 * @param {Number} mss 时间戳
 * @returns {String} 距离现在时间范围
 */
function getTimeUntilNow(mss) {
  var days = parseInt(Math.round((new Date() - mss) / (1000 * 60 * 60 * 24)));
  if (days > 0) {
    return days + ' 天前';
  }
  var hours = parseInt(
    Math.round(((new Date() - mss) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  if (hours > 0) {
    return hours + ' 小时前 ';
  }
  var minutes = parseInt(
    Math.round(((new Date() - mss) % (1000 * 60 * 60)) / (1000 * 60)),
  );
  if (minutes > 0) {
    return minutes + ' 分钟前 ';
  }
  var seconds = Math.round(((new Date() - mss) % (1000 * 60)) / 1000);
  return '刚刚 ';
}
```

## 遍历文件夹生成文件目录树

```js
interface IDirTree {
  path: string; //文件完整路径
  name: string; // 文件或文件夹名字
  type: 'dir' | 'file'; // 目标类型，文件或者文件夹
  deep: number; // 文件深度
  key: string; // 文件唯一标识符，deep-index
  children?: IDirTree[]; // 子文件
}

/**
 *
 * @param dirs 目标文件夹数组，如只有一项，则为长度为1的文件夹数组
 * @param deep 文件夹的起始深度，默认为 0
 * @param filter 要过滤的文件夹或文件，默认为空数组
 * @param destinationExtName 要遍历的目标格式文件，以.拓展格式组成的字符串数组，默认为空数组
 * @returns 目录树
 *
 */
function createDirTree(
  dirs: string[],
  deep: number = 0,
  filter: string[] = [],
  destinationExtName: string[] = [],
): IDirTree[] {
  // 过滤文件夹或文件
  dirs = dirs.filter((dir) => {
    return !filter.includes(path.basename(dir));
  });
  // 筛选目标格式文件
  if (destinationExtName.length !== 0) {
    dirs = dirs.filter((dir) => {
      const stat = fs.statSync(dir);
      return (
        stat.isDirectory() || destinationExtName.includes(path.extname(dir))
      );
    });
  }

  let res: IDirTree[] = [];

  res = dirs.map((dir, index) => {
    const name = path.basename(dir);
    const stat = fs.statSync(dir);
    if (stat.isDirectory()) {
      const subDirs = fs.readdirSync(dir).map((item) => path.join(dir, item));
      return {
        path: dir,
        name: name,
        type: 'dir',
        deep: deep,
        key: deep + '-' + index,
        children: createDirTree(subDirs, deep + 1, filter, destinationExtName),
      };
    }

    return {
      path: dir,
      name: name,
      type: 'file',
      deep: deep,
      key: deep + '-' + index,
    };
  });

  return res;
}
```

## 求两个数组的交集

```js
/**
 * 求两个数组的交集
 * @param {Array} arr1 数组1
 * @param {Array} arr2 数组2
 * @returns {Array} 交集
 */
function intersection(arr1, arr2) {
  return arr1.filter((item) => arr2.includes(item));
}
```

## 获取某年第几周的起始日期

```js
/**
 *
 * @param year 年份
 * @param week 当年第几周
 * @param format 日期格式
 * @returns 起始日期和结束日期
 * @example getWeekStartEnd('2021', '1', 'YYYY-MM-DD') => { start: '2021-01-01', end: '2021-01-07' }
 */
function getWeekStartEnd(
  year: string | number,
  week: string | number,
  format = 'YYYY-MM-DD',
): { start: string, end: string } {
  const start = dayjs(`${year}-01-01`).add((Number(week) - 1) * 7, 'day');
  const end = start.add(6, 'day');
  return {
    start: start.format(format),
    end: end.format(format),
  };
}
```

## 根据起始颜色分割颜色

```js
/**
 *
 * @param start 起始颜色
 * @param end 结束颜色
 * @param steps 分为几份
 * @param gamma 色彩校正值
 * @returns 颜色数组
 * @example gradientColors('#000', '#fff', 5, 1) => [ '#000000', '#404040', '#808080', '#bfbfbf', '#ffffff' ]
 */

const gradientColors = function (
  start: string,
  end: string,
  steps: number,
  gamma: number,
): string[] {
  let i, j, ms, me;
  const output = [];
  const so = [];
  gamma = gamma || 1;
  const normalize = function (channel: number) {
    return Math.pow(channel / 255, gamma);
  };
  const startNumber = parseColor(start).map(normalize);
  const endNumber = parseColor(end).map(normalize);
  for (i = 0; i < steps; i++) {
    ms = i / (steps - 1);
    me = 1 - ms;
    for (j = 0; j < 3; j++) {
      so[j] = pad(
        Math.round(
          Math.pow(startNumber[j] * me + endNumber[j] * ms, 1 / gamma) * 255,
        ).toString(16),
      );
    }
    output.push('#' + so.join(''));
  }
  return output;
};

const parseColor = function (hexStr: string): number[] {
  return hexStr.length === 4
    ? hexStr
        .substring(1)
        .split('')
        .map(function (s) {
          return 0x11 * parseInt(s, 16);
        })
    : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(
        function (s) {
          return parseInt(s, 16);
        },
      );
};

const pad = function (s: string): string {
  return s.length === 1 ? '0' + s : s;
};
```
