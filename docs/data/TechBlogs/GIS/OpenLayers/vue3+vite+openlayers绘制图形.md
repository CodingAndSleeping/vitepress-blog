

# 定义绘图组件

> openlayer绘制图形主要使用`ol/interaction/Draw`类，通过`map.addInteraction()`实现交互式绘制图形.

**由于是使用vue开发的项目，因此，我将绘图工具封装成了一个组件，通过传递事件的方式实现子组件给父组件传值，先看一下`DrawFeature.vue`。主要功能包括绘制点、折线、曲线、圆形、正方形、矩形、规则多边形、不规则多边形以及取消绘制和清除功能。**

```html
// DrawFeature.vue
<template>
    <div class="drawFeature">
        <div class="title">绘制图形</div>
        <select class="select" v-model="featureName">
            <option disabled selected value="null">请选择</option>
            <option value="Point">点</option>
            <option value="LineString">折线</option>
            <option value="Curve">曲线</option>
            <option value="Circle">圆形</option>
            <option value="Square">正方形</option>
            <option value="Rectangle">矩形</option>
            <option value="Polygon">规则多边形</option>
            <option value="ArbPolygon">不规则图形</option>
        </select>
        <div class="cancelDraw" @click="cancelDraw">取消绘制</div>
        <div class="clearFeature" @click="clearFeature">清除</div>
    </div>
</template>
```

```css
// DrawFeature.vue
<style lang="less">
.drawFeature {
    width: 113px;
    padding: 10px;
    position: fixed;
    top: 100px;
    right: 10px;
    background-color: #7C9ABE;
    outline: 5px solid rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    z-index: 100;
    // 标题样式
    .title {
        color: #f0f0f0;
        text-align: center;
    }
    // 选择框样式
    .select {
        display: block;
        margin: 5px auto;
        border: none;
    }
    // 按钮样式
    .clearFeature,
    .cancelDraw {
        margin-top: 10px;
        text-align: center;
        border-radius: 10px;
        background-color: #F6F5F1;
        cursor: pointer;
    }
}
</style>
```

**vue3接收父组件传递过来的事件通过`defineEmits()`来接收，返回的函数可以直接调用，通过传递事件名和参数来触发事件。**

```js
// DrawFeature.vue
<script setup>
import { ref, watch } from 'vue';
const emits = defineEmits(["drawInteraction"]); // 接收事件 
// 绘制图形的类型名
const featureName = ref(null);
// 监听类型名的变化，发生变化时提交事件
watch(featureName, newVal => {
    if (newVal) {
        emits("drawInteraction", newVal);
    }
})
// 取消绘制
function cancelDraw() {
    featureName.value = null; // 类型名置空
    emits("drawInteraction", "Cancel"); // 提交事件
}
// 清空绘制的图形
function clearFeature() {
    featureName.value = null; // 类型名置空
    emits("drawInteraction", "Clear"); // 提交事件
}
</script>
```

# 父组件绘制图形

**通过自定义事件的方式接受子组件传递过来的类型名**

```html
// Home.vue
<draw-feature @drawInteraction="drawInteraction"></draw-feature>
```

**在地图上添加一个矢量图层，作为绘图的图层**

```js
    // 初始化一个矢量图层
const vectorLayer = ref(new VectorLayer({
    name: "Vector"
}))
map.value = new Map({
    // 存放地图的容器
    target: "mapDiv",
    // 设置图层
    layers: [
        // osm图层
        OSMLayer.value,
        // 天地图图层
        tianLayer.value,
        // 矢量图层
        vectorLayer.value
    ],
    // 设置视图
    view: new View({
        center: [113.300839, 23.048857], // 中心点坐标
        zoom: 10, // 缩放等级
        projection: "EPSG:4326" // 坐标系
    }),
```

**初始化所要用到的ol类库，封装绘图函数**

```js
// Home.vue
// 创建一个空的Draw
const draw = ref(null);

// 初始化矢量图层
const vectorLayer = ref(null);

// 定义一个geometryFunction
let geometryFunction;

// 封装绘制图形函数
function drawFea(map, draw, layer, type, source, geometryFunction, freehand) {
    // 判断source是否为空，若为空，创建一个VectorSource对象，并设置为矢量图层的源
    if (!source.value) {
        source.value = new VectorSource({
            wrapX: false
        })
        layer.value.setSource(source.value);
    }
    // 创建绘图工具
    draw.value = new Draw({
        type, // 绘制图形类型
        source: source.value, // 绘制的目标源
        geometryFunction, // 绘图的几何函数
        freehand // 绘图时鼠标点击后是否松手进行绘制
    });
    // 给地图添加绘图交互
    map.value.addInteraction(draw.value);
}
```

**定义事件触发时调用的函数，通过判断类型名，进行不同的处理。**

```js
// Home.vue
// 绘图事件函数
function drawInteraction(val) {
    if (draw.value) {
        // 判断draw是否为空，若不为空移除上一个绘图交互
        map.value.removeInteraction(draw.value);
    }
    switch (val) {
        case "Cancel": // 取消绘制
            break;
        case "Clear": // 清空绘制
            vectorSource.value = null; // 矢量图层源置空
            vectorLayer.value.setSource(vectorSource.value); // 设置空的矢量图层源
            break;
        case "Curve": // 绘制曲线
            drawFea(map, draw, vectorLayer, "LineString", vectorSource, undefined, true);
            break;
        case "ArbPolygon": // 绘制不规则图形
            drawFea(map, draw, vectorLayer, "Polygon", vectorSource, undefined, true);
            break;
        case "Square": // 绘制正方形
            // 定义一个4条边的多边形几何函数
            geometryFunction = createRegularPolygon(4)
            drawFea(map, draw, vectorLayer, "Circle", vectorSource, geometryFunction, false);
            break;
        case "Rectangle": // 绘制矩形
            // 定义一个矩形几何函数
            geometryFunction = createBox()
            drawFea(map, draw, vectorLayer, "Circle", vectorSource, geometryFunction, true);
            break;
        default: // 绘制点、圆、折线、规则多边形
            geometryFunction = undefined;
            drawFea(map, draw, vectorLayer, val, vectorSource, undefined, false);
    }
}
```

![绘制图形](https://raw.githubusercontent.com/CodingAndSleeping/picgo/master/绘制图形.png)