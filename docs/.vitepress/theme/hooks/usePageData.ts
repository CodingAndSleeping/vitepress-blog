import { computed, ref } from 'vue';

const currentPage = ref(1);

const usePageData = (data: any[], pageSize: number = 10) => {
  const blogs = computed(() => {
    return data.slice(
      (currentPage.value - 1) * pageSize,
      currentPage.value * pageSize,
    );
  });

  return { blogs, currentPage };
};

export default usePageData;
