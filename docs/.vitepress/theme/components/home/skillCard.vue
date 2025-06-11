<template>
  <div class="main">
    <el-card shadow="hover" body-class="skill-card">
      <div class="skill-card__title">
        <span>🪄 我的技能</span>
      </div>
      <div class="skill-card__content">
        <img
          v-for="skill in skills"
          :key="skill"
          :src="withBase(`/icon/${skill}.svg`)"
          :title="skill"
        />
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
  'sass',
  'tailwindcss',
  'electron',
  'pinia',

  'nodejs',
  'express',
  'nestjs',
  'mysql',
  'redis',
  'docker',
  'linux',
  'nginx',

  'git',
  'github',
  'npm',
  'pnpm',

  'vite',
  'webpack',
  'babel',
  'rollupjs',
  'vitepress',
  'vitest',
  'mapbox',
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
    }

    .skill-card__content {
      display: flex;
      flex-wrap: wrap;
      img {
        height: 20px;
        width: 20px;
        margin: 5px;
        animation: focusing 1s infinite;
      }
    }
  }
}
</style>
