<template>
  <div class="main">
    <el-card shadow="hover" body-class="user-card">
      <img :src="withBase(theme.avatar)" alt="avatar" />
      <div class="user-card__user-name">CAS</div>
      <div class="user-card__blog-info">
        <div class="user-card__info-item">
          <div class="info-item__num">{{ data.length }}</div>
          <div class="info-item__label">博客文章</div>
        </div>

        <div class="split"></div>

        <div class="user-card__info-item">
          <div class="info-item__num">+{{ blogsInThisMonth.length }}</div>
          <div class="info-item__label">本月更新</div>
        </div>

        <div class="split"></div>

        <div class="user-card__info-item">
          <div class="info-item__num">+{{ blogsInThisWeek.length }}</div>
          <div class="info-item__label">本周更新</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { withBase, useData } from 'vitepress';
import { data } from '../../../blog.data';
import useBlogUpdateInfo from '../../hooks/useBlogUpdateInfo';

const { theme } = useData();
const { blogsInThisMonth, blogsInThisWeek } = useBlogUpdateInfo(data);
</script>

<style scoped lang="scss">
.main {
  width: 20rem;
  margin: 1rem 0;

  :deep(.user-card) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    img {
      width: 5rem;
      border-radius: 50%;
      margin: 1rem 0;
    }

    .user-card__user-name {
      font-weight: 600;
      text-align: center;
      margin: 0.5rem 0;
    }

    .user-card__blog-info {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin: 1rem 0;
      .user-card__info-item {
        margin: 0 1rem;
        text-align: center;
        .info-item__label {
          font-size: 0.8rem;
          color: #606f84;
        }
        .info-item__num {
          font-size: 1.2rem;
          font-weight: 600;
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
