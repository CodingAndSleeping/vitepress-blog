# 创建控件

**地图的基本控件包括导航控件、缩放按钮、缩放滑块、比例尺、鹰眼、坐标点以及图层切换按钮等，openlayers 给我们提供了一些现成的控件，可以直接调用，但有些比如图层切换需要自己实现（也可能是我没有找到相关 api？），废话不多说直接上代码。**

## 引入 ol 相关类库

```js
import 'ol/ol.css'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import XYZ from 'ol/source/XYZ'
import View from 'ol/View'
import {
  Zoom,
  ZoomSlider,
  MousePosition,
  ScaleLine,
  OverviewMap,
  ZoomToExtent,
} from 'ol/control'
import { createStringXY } from 'ol/coordinate'
import { onMounted, ref } from 'vue'
```

## openlayers 中给地图添加控件有两种方式，一种是直接在创建地图时配置`controls`项，还有一种是在地图创建完成后，使用`map.addControl()`方法添加。这里使用的是第一种。

定义存放控件的容器。

```html
<template>
  <!-- 定义一个容器存放地图 -->
  <div id="mapDiv">
    <!-- 存放坐标的容器 -->
    <div id="mapPoint"></div>
    <!-- 图层切换控件 -->
    <div id="changeLayer">
      <ul>
        <li>
          <input
            type="radio"
            value="OSM"
            v-model="currentLayer"
            @click="changeLayer"
          />
          <label>OSM</label>
        </li>
        <li>
          <input
            type="radio"
            value="Tian"
            v-model="currentLayer"
            @click="changeLayer"
          />
          <label>天地图</label>
        </li>
      </ul>
    </div>
  </div>
</template>
```

如果使用默认样式，很多控件会重合在一起，因此需要调整一下控件的位置和样式,这里使用的 less 的语法。

```css
<style lang="less">
// 清楚默认样式
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

#mapDiv { // 地图容器
  width: 100vw;
  height: 100vh;
  position: absolute;

  #mapPoint { // 坐标点
    width: 140px;
    height: 30px;
    position: fixed;
    left: 200px;
    bottom: 1px;
    z-index: 1000;
  }

  #changeLayer { // 图层切换控件
    position: fixed;
    background-color: #7C9ABE;
    border-radius: 10px;
    top: 10px;
    right: 10px;
    z-index: 100;

    ul {
      padding: 0;
      margin: 5px;

      li {
        padding: 0;
        list-style: none;
      }
    }
  }
}
// 调整鹰眼位置
.ol-overviewmap {
  left: auto;
  right: 0;
}
//调整导航控件位置
.ol-zoom-extent{
  top: 300px;
}
</style>
```

导航控件、缩放按钮、缩放滑块、比例尺、鹰眼、坐标点的添加直接在`controls`里配置即可。

```js
// 初始化一个空地图
const map = ref(null)
// 初始化地图函数
function initMap() {
  // 创建一个地图
  map.value = new Map({
    // 存放地图的容器
    target: 'mapDiv',
    // 设置图层
    layers: [
      // osm图层
      new TileLayer({
        name: 'OSM',
        source: new OSM(),
        visible: true,
      }),
      // 天地图图层
      new TileLayer({
        name: 'Tian',
        source: new XYZ({
          url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=你的token',
        }),
        visible: false,
      }),
    ],
    // 设置视图
    view: new View({
      center: [113.300839, 23.048857], // 中心点坐标
      zoom: 10, // 缩放等级
      projection: 'EPSG:4326', // 坐标系
    }),
    // 设置地图控件，值为一个数组
    controls: [
      new ZoomToExtent(), //导航控件
      new Zoom(), // 缩放按钮
      new ZoomSlider(), // 缩放滑块
      new ScaleLine(), // 比例尺
      new OverviewMap({
        // 鹰眼
        layers: [
          // 鹰眼的图层，这里使用OSM地图
          new TileLayer({
            name: 'osm',
            source: new OSM(),
            visible: true,
          }),
        ],
      }),
      new MousePosition({
        // 鼠标坐标点控件
        target: 'mapPoint', // 存放坐标的html元素
        coordinateFormat: createStringXY(3), // 坐标格式
        placeholder: '', // 当鼠标离开地图，无坐标信息时显示的内容
      }),
    ],
  })
}
```

图层切换控件的添加则需要手动写一些逻辑。

```js
// 定义一个变量记录当前图层名字
let currentLayer = ref('OSM')
// 切换图层
function changeLayer(e) {
  // 更换当前图层名字为所点单选框的值
  currentLayer.value = e.target.value
  // 遍历map的图层数组，将name与当前图层名字一致的图层设为可见，其余设为不可见
  map.value.getLayers().forEach(item => {
    item.get('name') == currentLayer.value
      ? item.setVisible(true)
      : item.setVisible(false)
  })
}
```

最后在 mounted 函数里调用初始化地图函数就可以了。

```js
// 组件挂载时初始化地图
onMounted(() => {
  initMap()
})
```

![地图控件](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/地图控件.png)
