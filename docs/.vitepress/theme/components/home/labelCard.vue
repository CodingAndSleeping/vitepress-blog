<template>
  <div class="main">
    <el-card shadow="hover" body-class="label-card">
      <div class="label-card__title">
        <span>🔖</span>
        文章标签
      </div>
      <div class="label-card__content">
        <el-tag
          class="label-card__label"
          v-for="label in blogLabels"
          :key="label"
          :type="label.type"
          size="small"
          effect="dark"
          >{{ label.text }}</el-tag
        >
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';
const { theme } = useData();
const types = ['primary', 'success', 'warning', 'danger', 'info'];
const blogLabels = computed(() => {
  let _labels = theme.value.blogLabels || [];
  return _labels.map((item, index) => ({
    text: item,
    type: types[index % 5],
  }));
});
</script>

<style scoped lang="scss">
.main {
  width: 20rem;
  margin: 1rem 0;

  :deep(.label-card) {
    padding: 0.5rem 1rem;

    .label-card__title {
      border-bottom: 1px solid #dddddd;
      height: 1.8rem;
      margin-bottom: 0.5rem;
    }

    .label-card__content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .label-card__label {
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>
