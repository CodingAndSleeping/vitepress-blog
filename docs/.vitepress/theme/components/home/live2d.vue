<template>
  <canvas ref="canvasRef" class="live2d"></canvas>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Application, Ticker } from 'pixi.js'
import { Live2DSprite, Config } from 'easy-live2d'

const canvasRef = ref<HTMLCanvasElement>()
const app = new Application()
const live2DSprite = new Live2DSprite()
// 配置基本设置
Config.MotionGroupIdle = 'Idle' // 设置默认的空闲动作组
Config.MouseFollow = false // 禁用鼠标跟随

// 初始化 Live2D 精灵
live2DSprite.init({
  modelPath: '/vitepress-blog/Resources/Hiyori/Hiyori.model3.json',
  ticker: Ticker.shared,
})

// 添加点击事件监听
live2DSprite.onLive2D('hit', ({ hitAreaName, x, y }) => {
  console.log('点击区域:', hitAreaName, 'at', x, y)
})

onMounted(async () => {
  if (canvasRef.value) {
    await app.init({
      view: canvasRef.value,
      backgroundAlpha: 0, // 透明背景
    })

    // 调整大小并添加到舞台
    live2DSprite.width = canvasRef.value.clientWidth * window.devicePixelRatio
    live2DSprite.height = canvasRef.value.clientHeight * window.devicePixelRatio
    app.stage.addChild(live2DSprite)

    // 设置表情
    live2DSprite.setExpression({
      expressionId: 'normal',
    })
  }
})

onUnmounted(() => {
  // 释放资源
  live2DSprite.destroy()
})
</script>

<style lang="scss" scoped>
.live2d {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 200px;
  height: 300px;
}
</style>
