import DefaultTheme from 'vitepress/theme';
import Layout from './components/layout/index.vue';
import { Theme } from 'vitepress';
import 'element-plus/theme-chalk/dark/css-vars.css';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import SummaryPage from './components/summaryPage/index.vue';

// 自定义样式
import './style/index.css';

export default {
  extends: DefaultTheme,
  // 使用注入插槽的包装组件覆盖 Layout
  Layout,
  enhanceApp({ app }) {
    app.use(ElementPlus);
    app.component('SummaryPage', SummaryPage);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
} satisfies Theme;
