<template>
  <div class="blog-list">
    <el-card
      shadow="hover"
      class="card"
      v-for="item in blogs"
      :key="item.url"
      @click="handleBlogClik(item.url)"
    >
      <i class="top" v-if="item.top"></i>

      <span class="title">{{ item.title }}</span>
      <span class="desc">{{ item.desc }}</span>

      <div class="info">
        <span class="user split">CAS</span>
        <span class="date split">{{ item.date.ZHString }}</span>
        <div class="label mobile-hidden">
          <div v-for="label in item.label" :key="label">
            <el-tag size="small">{{ label }}</el-tag>
          </div>
        </div>
      </div>
    </el-card>

    <div class="pagination">
      <el-pagination
        size="small"
        background
        layout="prev, pager, next, total"
        v-model:currentPage="currentPage"
        :total="data.length"
        :page-size="10"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vitepress';
import { data } from '../../../blog.data';
import usePageData from '../../hooks/usePageData';

const router = useRouter();

const { blogs, currentPage } = usePageData(data);

const handleBlogClik = (url: string) => {
  router.go('/vitepress-blog' + url);
};
</script>

<style scoped lang="scss">
.blog-list {
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;

  margin-right: 1rem;
  .card {
    width: 50rem;

    margin-bottom: 1rem;
    cursor: pointer;
    position: relative;

    @media (max-width: 768px) {
      width: 20rem;
    }

    .top {
      position: absolute;
      overflow: hidden;
      width: 30px;
      height: 30px;
      top: -2px;
      left: -2px;
      opacity: 0.5;
    }
    .top::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 30px;
      background-image: linear-gradient(
        45deg,
        var(--el-color-primary),
        var(--el-color-primary)
      );
      transform: rotate(-45deg) translateY(-20px);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 5px 10px #0000003b;
    }

    .title {
      width: fit-content;
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      text-overflow: ellipsis;

      background: linear-gradient(to right, #353535, #353535) no-repeat left
        bottom;
      background-size: 0 1px;
      transition: 0.5s;
    }

    .desc {
      width: fit-content;
      margin: 1rem 0;
      font-size: 0.8rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .info {
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

      .label {
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
