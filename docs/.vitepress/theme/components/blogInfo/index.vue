<template>
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
<script setup lang="ts">
import moment from 'moment';
import { useData } from 'vitepress';
const { frontmatter } = useData();
</script>
<style lang="scss">
.doc__info {
  margin: 1rem 0;
  display: flex;
  align-items: center;

  margin-bottom: 2rem;

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
