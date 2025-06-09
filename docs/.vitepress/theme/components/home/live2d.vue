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

  const { Application, Ticker, Loader } = await import('pixi.js');
  const { Live2DSprite, Config } = await import('easy-live2d');

  const loader = new Loader();
  app = new Application();
  live2DSprite = new Live2DSprite();

  // 配置基本设置
  Config.MotionGroupIdle = 'Idle'; // 设置默认的空闲动作组
  Config.MouseFollow = false; // 禁用鼠标跟随

  // 初始化 Live2D 精灵ß
  live2DSprite.init({
    modelPath: '/vitepress-blog/Resources/Hiyori/Hiyori.model3.json',
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

    // loadngInstance.close();

    // 👇 等待渲染完成后再关闭 loading
    try {
      await waitForModelRender(canvasRef.value);
    } catch (e) {
      console.warn('[Live2D] 加载超时：', e);
    } finally {
      loadngInstance.close();
    }
  }
});

onUnmounted(() => {
  // 释放资源
  if (live2DSprite) {
    live2DSprite.destroy();
  }
});

function waitForModelRender(
  canvas: HTMLCanvasElement,
  timeout = 10000,
): Promise<void> {
  const ctx = canvas.getContext('2d');
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    function check() {
      if (!ctx) return reject(new Error('Canvas context not available'));

      const pixels = ctx.getImageData(0, 0, 1, 1).data;
      const rendered = pixels[3] > 0; // alpha 通道不为 0 表示已渲染

      if (rendered) {
        resolve();
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Live2D 加载超时'));
      } else {
        requestAnimationFrame(check);
      }
    }

    check();
  });
}
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
