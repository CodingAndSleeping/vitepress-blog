import DefaultTheme from 'vitepress/theme';
import Layout from './components/layout/index.vue';
import { inBrowser, Theme } from 'vitepress';
import 'element-plus/theme-chalk/dark/css-vars.css';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import SummaryPage from './components/summaryPage/index.vue';
import MyHome from './components/home/index.vue';

import { NProgress } from 'nprogress-v2/dist/index.js'; // 进度条组件
import 'nprogress-v2/dist/index.css'; // 进度条样式

// @ts-ignore
import busuanzi from 'busuanzi.pure.js';

// 自定义样式
import './style/index.css';

export default {
  extends: DefaultTheme,
  // 使用注入插槽的包装组件覆盖 Layout
  Layout,
  enhanceApp({ app, router }) {
    app.use(ElementPlus);
    app.component('MyHome', MyHome);
    app.component('SummaryPage', SummaryPage);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }

    if (inBrowser) {
      NProgress.configure({ showSpinner: false });
      router.onBeforeRouteChange = () => {
        NProgress.start(); // 开始进度条
      };
      router.onAfterRouteChange = () => {
        busuanzi.fetch();
        NProgress.done(); // 停止进度条
      };
    }
  },
} satisfies Theme;
