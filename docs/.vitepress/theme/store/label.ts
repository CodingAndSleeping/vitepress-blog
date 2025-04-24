import { ref } from 'vue';

export const currentLabel = ref('');

export const updateLabel = (label: string) => {
  currentLabel.value = label;
};
