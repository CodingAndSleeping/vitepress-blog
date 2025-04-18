import DefaultTheme from 'vitepress/theme';
import Layout from './components/layout/index.vue';
import { Theme } from 'vitepress';
import 'element-plus/theme-chalk/dark/css-vars.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
export default {
  extends: DefaultTheme,
  // 使用注入插槽的包装组件覆盖 Layout
  Layout,
  enhanceApp({ app }) {
    app.use(ElementPlus);
  },
} satisfies Theme;
