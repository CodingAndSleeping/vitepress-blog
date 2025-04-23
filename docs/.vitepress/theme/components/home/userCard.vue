<template>
  <div class="user-card">
    <el-card shadow="hover" body-class="card">
      <img :src="withBase(theme.avatar)" alt="avatar" />
      <div class="name">CAS</div>
      <div class="blog-info">
        <div class="info-item">
          <div class="num">{{ data.length }}</div>

          <div class="label">博客文章</div>
        </div>

        <div class="split"></div>

        <div class="info-item">
          <div class="num">+{{ blogsInThisMonth.length }}</div>
          <div class="label">本月更新</div>
        </div>

        <div class="split"></div>

        <div class="info-item">
          <div class="num">+{{ blogsInThisWeek.length }}</div>
          <div class="label">本周更新</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { withBase, useData } from 'vitepress'
import { data } from '../../../blog.data';
import useBlogUpdateInfo from '../../hooks/useBlogUpdateInfo';

const { theme } = useData()
const { blogsInThisMonth, blogsInThisWeek } = useBlogUpdateInfo(data);
</script>

<style scoped lang="scss">
.user-card {
  width: 20rem;
  margin-bottom: 1rem;

  :deep(.el-card__body) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    img {
      width: 5rem;
      border-radius: 50%;
      margin: 1rem 0;
    }

    .name {
      font-weight: 500;
      text-align: center;
      margin: 0.5rem 0;
    }

    .blog-info {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 1rem 0;
      .info-item {
        margin: 0 1rem;
        text-align: center;
        .label {
          font-size: 0.8rem;
          color: #606f84;
        }
        .num {
          font-size: 1.2rem;
          font-family: monospace;
        }
      }

      .split {
        content: '';
        display: inline-block;
        width: 1px;
        height: 8px;
        margin: 0 10px;
        background-color: #4e5969;
      }
    }
  }
}
</style>
