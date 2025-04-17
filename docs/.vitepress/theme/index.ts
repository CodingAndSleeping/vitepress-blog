import DefaultTheme from 'vitepress/theme';
import Layout from './components/layout.vue';

export default {
  extends: DefaultTheme,
  // 使用注入插槽的包装组件覆盖 Layout
  Layout,
};
