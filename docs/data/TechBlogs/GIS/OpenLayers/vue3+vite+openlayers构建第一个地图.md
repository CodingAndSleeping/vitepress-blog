# 一、背景
本人刚学完vue3，因此想在vue3的基础上学习openlayers地图应用的开发，因此特开此博客记录学习历程。

# 二、环境搭建
> vite + vue3 + openlayers

## 新建项目
首先，使用vite创建项目，由于ts还不太熟悉，因此就选择js版本的vue就可以了。
> npm init vite openlayers_test 

## 初始化项目
首先进入项目，由于vite并没有给我们安装好项目所需依赖，因此还要手动安装一下。
> cd openlayers_test  
> npm i

## 安装openlayers库
默认最新版就好了。
> npm i ol

## 启动项目
vite与vue-cli启动项目的指令也不一样，vite是dev，而不是serve
> npm run dev

# 三、编写代码

##  引入ol

```js
import 'ol/ol.css'
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
```

## 创建地图容器

```html
<template>
<!-- 定义一个容器存放地图 -->
  <div id="mapDiv"></div>
</template>
```
```css
 #mapDiv {
  width: 100vw;
  height: 100vh;
  position: absolute;
}
```

## 创建地图 
```js
// 初始化一个空地图
const map = ref(null);

// 初始化地图函数
function initMap() {
  // 创建一个地图
  map.value = new Map({
    // 指向目标容器
    target: "mapDiv",
    // 加载图层，使用的是OSM图层
    layers: [
      new TileLayer({
        title: "osm",
        source: new OSM()
      })
    ],
    // 设置视图
    view: new View({
      center: [113.300839, 23.048857],// 中心点坐标
      zoom: 10, // 缩放等级
      projection: "EPSG:4326" // 坐标系
    })
  })
}
// 组件挂载时初始化地图
onMounted(() => {
  initMap();
})
```

这样一个最基本的地图应用就创建成功啦！

![第一个地图](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/第一个地图.png)