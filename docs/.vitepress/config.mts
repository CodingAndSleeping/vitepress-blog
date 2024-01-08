import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vitepress-blog/',
  srcDir: 'data',
  title: "路遥知码力",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '关于我', link: '/' },
      { text: '技术文章', link: '/tech-blogs/' },
      {
        text: '前端知识',
        items: [
          // { text: 'HTML', link: '/html' },
          // { text: 'CSS', link: '/css' },
          // { text: 'JavaScript', link: '/front-end/javascript/' },
          // { text: 'TypeScript', link: '/typescript' },
          // { text: 'Vue', link: '/vue' },
          // { text: 'React', link: '/react' },
        ],

        
      }
    ],

    sidebar: {
      '/tech-blogs/': [
        {
          text: 'Guide',
          items: [
            // { text: 'One3213', link: '/guide/one' },
            // { text: 'Two333333', link: '/guide/two' }
          ]
        }
      ],

      '/front-end/javascript/': [
        {
          text: 'Guide',
          items: [
            // { text: 'One3213', link: '/guide/one' },
            // { text: 'Two3123', link: '/guide/two' }
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
