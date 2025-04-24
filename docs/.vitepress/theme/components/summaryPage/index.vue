<template>
  <div class="summary">
    <h1 class="summary__title">{{ desc }}</h1>

    <ul class="summary__list">
      <li
        v-for="item of pageData"
        :key="item.link"
        class="summary__item"
        @click="router.go(item.link)"
      >
        <span> {{ item.text }} 📎</span>
      </li>
    </ul>

    <div class="summary__pagination">
      <el-pagination
        hide-on-single-page
        size="small"
        background
        layout="prev, pager, next, total"
        v-model:currentPage="currentPage"
        :total="toc.length"
        :page-size="pageSize"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { computed } from 'vue';
import usePageData from '../../hooks/usePageData.ts';

const { path, desc } = defineProps<{
  path: string;
  desc: string;
}>();

const router = useRouter();

const { theme } = useData();

const toc = computed(() => {
  if (!theme.value.sidebar || !theme.value.sidebar[path]) return [];
  return theme.value.sidebar[path].map((item) => ({
    ...item,
    link: `/vitepress-blog${item.link}`,
  }));
});

const pageSize = 20;

const { pageData, currentPage } = usePageData(toc.value, pageSize);
</script>

<style lang="scss" scoped>
.summary {
  height: calc(100vh - 65px - 128px - 48px);
  display: flex;
  flex-direction: column;
  align-items: center;
  .summary__title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .summary__item {
    span {
      font-size: 15px;
      line-height: 1.5;
      color: #037bf4;
      border-bottom: 1px solid #037bf4;
      cursor: pointer;
    }

    span:hover {
      color: #90c7fa;
    }
  }

  .summary__pagination {
    position: absolute;
    bottom: 0;
    transform: translateY(50px);
  }
}

:deep(.el-pager) {
  padding: 0;
}
</style>
