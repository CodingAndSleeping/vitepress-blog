<template>
  <div class="main">
    <el-card shadow="hover" body-class="skill-card">
      <div class="skill-card__title">
        <span><img :src="withBase('/skill.svg')" alt="" />个人技能</span>
      </div>
      <div class="skill-card__content">
        <img
          class="skill-icon floaty"
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
      grid-template-columns: repeat(auto-fill, minmax(25px, 1fr));
      gap: 15px;
      justify-items: center;
      .skill-icon {
        height: 20px;
        width: 20px;
        transition: transform 0.4s ease;
      }
      .skill-icon:hover {
        transform: rotate(10deg) translateY(-6px) scale(1.2);
      }
    }
  }
}
</style>
