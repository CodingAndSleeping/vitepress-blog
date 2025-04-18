import { defineConfig } from 'vitepress';
import { fileURLToPath, URL } from 'node:url';
import themeConfig from './themeConfig';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vitepress-blog/',
  srcDir: 'data',
  title: 'CodingAndSleeping',
  // description: "A VitePress Site",
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/vitepress-blog/favicon.svg' }]],
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
  },
});
