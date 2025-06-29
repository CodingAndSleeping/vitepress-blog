<template>
  <div class="summary">
    <h1 class="summary__title">
      文章列表
      <span>{{ desc }}</span>
    </h1>

    <ul class="summary__list">
      <li
        v-for="item of pageData"
        :key="item.link"
        class="summary__item"
        :title="item.text"
        @click="router.go(item.link)"
      >
        <span class="summary__link">🔗 {{ item.text }} </span>
      </li>
    </ul>

    <div class="summary__pagination">
      <el-pagination
        hide-on-single-page
        background
        size="small"
        layout="prev, pager, next, total"
        v-model:currentPage="currentPage"
        :total="total"
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

const pageSize = 15;

const { pageData, currentPage, total } = usePageData(toc, pageSize);
</script>

<style lang="scss" scoped>
.summary {
  max-width: 350px;
  margin: 3rem auto;

  .summary__title {
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: var(--vp-c-text-1);
    span {
      font-size: 0.95rem;
      color: var(--vp-c-text-2);
      font-weight: 400;
      margin: 0;
      flex: 1;
      text-align: right;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 60%;
    }
  }

  .summary__list {
    list-style: none;
    padding: 0;
    margin: 0;

    .summary__item {
      max-width: 100%;
      margin: 0.5rem auto;
      padding-left: 1rem;
      border-left: 2px solid var(--vp-c-border);
      transition: border-color 0.2s;
      cursor: pointer;

      .summary__link {
        font-size: 1rem;
        text-decoration: none;
        display: inline-block;
        transition: color 0.2s;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
        border-bottom: 1px dashed transparent;
        transition: all 0.2s ease;
      }

      &:hover {
        border-left-color: var(--vp-c-brand);
        .summary__link {
          color: var(--vp-c-brand);
          border-bottom-color: var(--vp-c-brand);
        }
      }
    }
  }

  .summary__pagination {
    margin-top: 2rem;
    text-align: center;
  }

  :deep(.el-pagination) {
    width: fit-content;
    margin: 1rem auto;
  }
  :deep(.el-pager) {
    padding: 0;
  }
}
</style>
