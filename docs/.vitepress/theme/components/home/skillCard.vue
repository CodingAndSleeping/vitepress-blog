<template>
  <div class="main">
    <el-card shadow="hover" body-class="skill-card">
      <div class="skill-card__title">
        <span><img :src="withBase('/skill.svg')" alt="" />个人技能</span>
      </div>
      <div class="skill-card__content">
        <el-tooltip
          v-for="(skill, index) in skills"
          :key="skill"
          :content="skill"
          placement="top"
          :hide-after="0"
        >
          <img
            class="skill-icon floaty"
            :src="withBase(`/icon/${skill}.svg`)"
            :style="{ '--i': index % 7 }"
          />
        </el-tooltip>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress';
import { ref } from 'vue';

const skills = ref<string[]>([
  'javascript',
  'html',
  'css',
  'typescript',
  'vue',
  'react',
  'nextjs',
  'sass',
  'tailwindcss',
  'electron',
  'markdown',
  'pinia',
  'vite',
  'webpack',
  'babel',
  'rollupjs',
  'vitepress',
  'vitest',
  'mapbox',
  'git',
  'github',
  'npm',
  'pnpm',

  'nodejs',
  'express',
  'nestjs',
  'mysql',
  'redis',
  'docker',
  'linux',
  'nginx',
  'python',
]);
</script>
<style scoped lang="scss">
.main {
  width: 20rem;
  margin: 1rem 0;

  :deep(.skill-card) {
    padding: 0.5rem 1rem;
    .skill-card__title {
      border-bottom: 1px solid #dddddd;
      height: 1.8rem;
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: space-between;

      span {
        display: flex;
        align-items: center;
        img {
          width: 1rem;
          margin: 0 5px;
        }
      }
    }

    .skill-card__content {
      padding: 5px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(30px, 1fr));
      gap: 10px;
      justify-items: center;
      .skill-icon {
        background: var(--code-bg); // 可根据主题自动变亮/变暗
        border-radius: 10px;
        padding: 5px;
        width: 30px;
        height: 30px;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
      }
      .skill-icon:hover {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        background: rgba(100, 100, 255, 0.15); // 提示高亮
      }
    }
  }
}

.floaty {
  animation: float 3s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.4s);
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(5px);
  }
}

:deep(.el-popper.is-customized) {
  /* Set padding to ensure the height is 32px */
  // padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}
:deep(.el-popper.is-customized .el-popper__arrow::before) {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>
