import { DefaultTheme, defineConfig } from 'vitepress';
import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs/promises';
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
          return data.sort(
            (a, b) => Number(a.split('.')[0]) - Number(b.split('.')[0]),
          );
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

  async transformPageData(pageData) {
    try {
      const content = await fs.readFile(
        fileURLToPath(
          new URL(`../data/${pageData.relativePath}`, import.meta.url),
        ),
        'utf-8',
      );

      const plainText = content
        .replace(/---[\s\S]*?---/g, '') // 去除 frontmatter
        .replace(/!\[[^\]]*\]\([^)]+\)/g, '') // 图片
        .replace(/\[[^\]]*\]\([^)]+\)/g, '') // 链接
        .replace(/[#>*-]/g, '') // Markdown 标记
        .replace(/\s+/g, ' ') // 多空格合一
        .trim();

      const charCount = plainText.length;

      // 获取中文字符
      const chineseCharCount = (plainText.match(/[\u4e00-\u9fa5]/g) || [])
        .length;
      // 获取英文字符
      const wordCount = plainText.split(/\s+/).length;
      // 2. 估算阅读时间（中文按每分钟 300 字，英文按每分钟 200 词）
      const readingTimeMin = Math.ceil(
        chineseCharCount / 300 + wordCount / 200,
      );

      pageData.frontmatter.charCount = charCount;
      pageData.frontmatter.readingTimeMin = readingTimeMin;
      readingTimeMin > 0 ? readingTimeMin : 1;
    } catch (err) {
      console.log(err);
    }
  },
});
