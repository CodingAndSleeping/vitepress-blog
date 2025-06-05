<template>
  <div class="live2d" ref="loading">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue';
import { ElLoading } from 'element-plus';

const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef');
const loading = useTemplateRef<HTMLDivElement>('loading');

let app;
let live2DSprite;

onMounted(async () => {
  if (typeof window === 'undefined') return;

  const loadngInstance = ElLoading.service({
    target: loading.value!,
    text: 'lucking...',
    background: 'transparent',
  });

  const { Application, Ticker } = await import('pixi.js');
  const { Live2DSprite, Config } = await import('easy-live2d');

  app = new Application();
  live2DSprite = new Live2DSprite();

  // 配置基本设置
  Config.MotionGroupIdle = 'Idle'; // 设置默认的空闲动作组
  Config.MouseFollow = false; // 禁用鼠标跟随

  const url = new URL(
    '../../resources/Hiyori/Hiyori.model3.json',
    import.meta.url,
  ).href;

  // 初始化 Live2D 精灵ß
  live2DSprite.init({
    modelPath: url,
    ticker: Ticker.shared,
  });

  if (canvasRef.value) {
    await app.init({
      view: canvasRef.value,
      backgroundAlpha: 0, // 透明背景
    });

    // 调整大小并添加到舞台
    live2DSprite.width = canvasRef.value.clientWidth * window.devicePixelRatio;
    live2DSprite.height =
      canvasRef.value.clientHeight * window.devicePixelRatio;

    live2DSprite.setRandomExpression();
    app.stage.addChild(live2DSprite);

    loadngInstance.close();
  }
});

onUnmounted(() => {
  // 释放资源
  if (live2DSprite) {
    live2DSprite.destroy();
  }
});
</script>

<style lang="scss" scoped>
.live2d {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 200px;
  height: 300px;

  canvas {
    height: 100%;
    width: 100%;
  }
}
</style>
