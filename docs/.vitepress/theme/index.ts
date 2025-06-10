import DefaultTheme from 'vitepress/theme';
import Layout from './components/layout/index.vue';
import { Theme } from 'vitepress';
import 'element-plus/theme-chalk/dark/css-vars.css';
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import SummaryPage from './components/summaryPage/index.vue';
import MyHome from './components/home/index.vue';
import { useLive2d } from 'vitepress-theme-website';
// 自定义样式
import './style/index.css';

export default {
  extends: DefaultTheme,
  // 使用注入插槽的包装组件覆盖 Layout
  Layout,
  enhanceApp({ app }) {
    app.use(ElementPlus);
    app.component('MyHome', MyHome);
    app.component('SummaryPage', SummaryPage);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },

  setup() {
    //看板娘
    useLive2d({
      enable: true,
      model: {
        url: 'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/ryoufuku/ryoufuku.model.json',
        // url: '/vitepress-blog/Resources/Hiyori/Hiyori.model3.json',
      },
      display: {
        position: 'left',
        width: '135px',
        height: '300px',
        xOffset: '50px',
        yOffset: '0px',
      },
      mobile: {
        show: false,
      },
      react: {
        opacity: 1,
      },
    });
  },
} satisfies Theme;
