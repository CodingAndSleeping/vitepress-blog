<template>
  <div
    class="main"
    :style="{
      '--underline-color': underlineColor,
    }"
  >
    <el-card
      shadow="hover"
      class="blog-list"
      v-for="item in pageData"
      :key="item.url"
      @click="handleBlogClik(item.url)"
    >
      <i class="blog-list__top" v-if="item.top"></i>

      <span class="blog-list__title">{{ item.title }}</span>
      <span class="blog-list__desc">{{ item.desc }}</span>

      <div class="blog-list__info">
        <span class="blog-list__user split">CAS</span>
        <span class="blog-list__date split">{{ item.date.ZHString }}</span>
        <div class="blog-list__label mobile-hidden">
          <div v-for="label in item.label" :key="label">
            <el-tag size="small">{{ label }}</el-tag>
          </div>
        </div>
      </div>
    </el-card>

    <div class="pagination">
      <el-pagination
        hide-on-single-page
        size="small"
        background
        layout="prev, pager, next, total"
        v-model:currentPage="currentPage"
        :total="total"
        :page-size="10"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useData } from 'vitepress';
import { data } from '../../blog.data';
import usePageData from '../../hooks/usePageData';
import { computed, watch } from 'vue';

import { currentLabel } from '../../store/label';

const router = useRouter();

const _data = computed(() => {
  if (currentLabel.value) {
    return data.filter(item => {
      if (!item.label) return true;
      return item.label.includes(currentLabel.value);
    });
  } else {
    return data;
  }
});

const { pageData, currentPage, total } = usePageData(_data);

watch(currentPage, () => {
  scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

const handleBlogClik = (url: string) => {
  router.go('/vitepress-blog' + url);
};

const { isDark } = useData();

const underlineColor = computed(() => {
  return isDark.value ? '#fff' : '#000';
});
</script>

<style scoped lang="scss">
.main {
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;

  margin: 1rem;
  .blog-list {
    width: 50rem;
    margin-bottom: 1rem;
    cursor: pointer;
    position: relative;
    @media (max-width: 768px) {
      width: 20rem;
    }
    .blog-list__top {
      position: absolute;
      overflow: hidden;
      width: 30px;
      height: 30px;
      top: -2px;
      left: -2px;
      opacity: 0.5;
    }
    .blog-list__top::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 30px;
      background-image: linear-gradient(45deg, var(--el-color-primary), var(--el-color-primary));
      transform: rotate(-45deg) translateY(-20px);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 5px 10px #0000003b;
    }

    .blog-list__title {
      width: fit-content;
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      line-clamp: 1;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;

      background: linear-gradient(to right, var(--underline-color), var(--underline-color)) no-repeat left bottom;
      background-size: 0 1px;
      transition: 0.5s;
    }

    .blog-list__title:hover {
      background-size: 100% 2px;
    }

    .blog-list__desc {
      width: fit-content;
      margin: 1rem 0;
      font-size: 0.8rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      line-clamp: 2;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .blog-list__info {
      display: flex;
      align-items: center;
      font-size: 0.7rem;
      line-height: 8px;
      height: 8px;
      font-weight: 500;
      .split::after {
        content: '';
        display: inline-block;
        width: 1px;
        height: 8px;
        margin: 0 10px;
        background-color: #4e5969;
      }

      .blog-list__label {
        display: flex;
        div {
          margin: 0 0.5rem;
        }

        @media (max-width: 768px) {
          display: none;
        }
      }
    }
  }

  .card:hover {
    .title {
      background-size: 100% 2px;
    }
  }

  .pagination {
    margin: 1rem;
  }
}
</style>
