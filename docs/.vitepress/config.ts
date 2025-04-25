import { DefaultTheme, defineConfig } from 'vitepress';
import { fileURLToPath, URL } from 'node:url';
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';
import nav from './nav';

const themeConfig = {
  logo: '/favicon.svg',
  avatar: '/avatar.jpg',
  outline: {
    level: [2, 4],
  },
  socialLinks: [
    { icon: 'github', link: 'https://github.com/CodingAndSleeping' },
  ],
  search: {
    provider: 'local',
  },
  nav,

  // 自定义属性
  title: 'CAS BLOG',

} as DefaultTheme.Config & {
  title?: string; // 首页标题
  quotes?: string[]; // 自定义 首页变化语句 数组
};

export default defineConfig({
  base: '/vitepress-blog/',
  srcDir: 'data',
  title: 'CodingAndSleeping',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: '/vitepress-blog/favicon.svg' }],
    [
      'script',
      {
        defer: '',
        src: 'https://cdn.jsdelivr.net/gh/Fuukei/Public_Repository@latest/static/js/sakura-less.js',
      },
    ],
  ],
  themeConfig,
  vite: {
    resolve: {
      alias: [
        {
          find: /^.*\/VPHome\.vue$/,
          replacement: fileURLToPath(
            new URL('./theme/components/home/index.vue', import.meta.url),
          ),
        },
      ],
    },

    plugins: [
      AutoSidebar({
        ignoreList: ['**/public/**'],
        path: 'docs/data',
        ignoreIndexItem: true,
        titleFromFileByYaml: true,
        beforeCreateSideBarItems(data) {
          data.sort((a, b) => {
            return Number(a.split('.')[0]) - Number(b.split('.')[0]);
          });
          return data;
        },

        sideBarResolved(data) {
          const newData = {};
          Object.entries(data).forEach(([key, value]) => {
            const items = value[0].items;
            items.forEach((item) => {
              if (item.items) {
                newData[`${key}${item.text}/`] = item.items;
              }
              if (item.link) {
                newData[key] = items;
              }
            });
          });
          return newData;
        },
      }),
    ],
  },
});
