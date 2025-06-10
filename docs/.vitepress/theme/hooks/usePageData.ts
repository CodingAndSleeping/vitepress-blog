import { computed, Ref, ref } from 'vue';

const usePageData = (data: Ref<any[]>, pageSize: number = 10) => {
  const currentPage = ref(1);
  const total = ref(0);

  const pageData = computed(() => {
    total.value = data.value.length;

    return data.value.slice(
      (currentPage.value - 1) * pageSize,
      currentPage.value * pageSize,
    );
  });

  return { pageData, currentPage, total };
};

export default usePageData;
