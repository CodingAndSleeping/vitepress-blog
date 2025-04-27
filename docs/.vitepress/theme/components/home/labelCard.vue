<template>
  <div class="main">
    <el-card shadow="hover" body-class="label-card">
      <div class="label-card__title">
        <span>🔖 文章标签</span>
        <el-tag
          v-if="currentLabel"
          size="small"
          closable
          :disable-transitions="false"
          @close="handleRemoveLabel"
          >{{ currentLabel }}</el-tag
        >
      </div>
      <div class="label-card__content">
        <el-tag
          class="label-card__label"
          v-for="label in blogLabels"
          :key="label"
          :type="label.type"
          size="small"
          effect="dark"
          @click="handleLabelClick(label.text)"
          >{{ label.text }}</el-tag
        >
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { data } from '../../blog.data';
import { currentLabel, updateLabel } from '../../store/label';

const types = ['primary', 'success', 'warning', 'danger', 'info'];
const blogLabels = computed(() => {
  let _labels = data.reduce<any[]>((acc, cur) => {
    cur.label.forEach((label) => {
      if (!acc.includes(label)) {
        acc.push(label);
      }
    });
    return acc;
  }, []);
  return _labels.map((item, index) => ({
    text: item,
    type: types[index % 5],
  }));
});

const handleLabelClick = (label: string) => {
  updateLabel(label);
};
const handleRemoveLabel = () => {
  updateLabel('');
};

watch(currentLabel, () => {
  scrollTo({
    top: 0,
    behavior: 'smooth',
  });
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

      display: flex;
      justify-content: space-between;
    }

    .label-card__content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .label-card__label {
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        cursor: pointer;
      }
    }
  }
}
</style>
