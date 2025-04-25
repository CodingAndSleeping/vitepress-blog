<script setup lang="ts">
import moment from 'moment';
import { useData } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import { nextTick, provide } from 'vue';
const { isDark, frontmatter, page } = useData();

const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value;
    return;
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ];

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value;
    await nextTick();
  }).ready;

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  );
});
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before v-if="frontmatter.title">
      <div class="doc__tittle">{{ frontmatter.title }}</div>
      <div class="doc__info">
        <div class="info__item">
          <el-icon class="info__icon"><UserFilled /></el-icon>
          <span>CAS</span>
        </div>
        <div class="info__item">
          <el-icon class="info__icon"><Clock /></el-icon>
          <span>{{ moment(frontmatter.date).format('YYYY-MM-DD') }}</span>
        </div>
        <div class="info__item">
          <el-icon class="info__icon"><EditPen /></el-icon>
          <span>{{ frontmatter.charCount }} 个字</span>
        </div>
        <div class="info__item">
          <el-icon class="info__icon"><AlarmClock /></el-icon>
          <span>{{ frontmatter.readingTimeMin }} 分钟 </span>
        </div>
        <div class="info__item">
          <el-icon><CollectionTag /></el-icon>
          <span
            class="info__tags"
            :class="index === frontmatter.label.length - 1 ? '' : 'split'"
            v-for="(item, index) in frontmatter.label"
            :key="item"
            >{{ item }}</span
          >
        </div>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>

<style lang="scss">
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}

.VPNav {
  border-bottom: 1px solid #eee;
  opacity: 1;
}

#canvas_sakura {
  z-index: -99;
}

.doc__tittle {
  letter-spacing: -0.02em;
  line-height: 40px;
  font-size: 32px;
  font-weight: 700;
}

.doc__info {
  margin: 1rem 0;
  display: flex;
  align-items: center;

  .info__item {
    display: flex;
    align-items: center;

    margin-right: 1.5rem;

    .info__icon {
      margin-right: 5px;
    }

    span {
      height: 14px;
      line-height: 14px;
      font-size: 14px;
    }

    .split::after {
      content: '';
      display: inline-block;
      width: 1px;
      height: 8px;
      margin: 0 10px;
      background-color: #4e5969;
    }
  }
}
</style>
