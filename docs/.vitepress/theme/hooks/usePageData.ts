import { computed, ref } from 'vue';
import { currentLabel } from '../store/label';

const usePageData = (data: any[] = [], pageSize: number = 10) => {
  const currentPage = ref(1);
  const total = ref(0);

  let _data = data;

  const pageData = computed(() => {
    if (currentLabel.value) {
      _data = data.filter((item) => {
        return item.label && item.label.includes(currentLabel.value);
      });
    } else {
      _data = data;
    }
    total.value = _data.length;
    return _data.slice(
      (currentPage.value - 1) * pageSize,
      currentPage.value * pageSize,
    );
  });

  return { pageData, currentPage, total, currentLabel };
};

export default usePageData;
