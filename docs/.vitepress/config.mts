import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vitepress-blog/',
  srcDir: 'data',
  title: '路遥知码力',
  // description: "A VitePress Site",
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/vitepress-blog/favicon.svg' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.svg',
    nav: [
      { text: '主页', link: '/' },
      {
        text: '技术博客',
        link: '/TechBlogs/Others/常用git指令总结.md',
        // [
        //   { text: 'GIS', link: '/TechBlogs/GIS/' },
        //   { text: 'Electron', link: '/TechBlogs/Electron/' },
        //   { text: '其他', link: '/TechBlogs/Others/' },
        // ],
      },

      {
        text: '前端工程化',
        link: '/前端工程化/模块化.md',
      },
      {
        text: '前端知识',
        items: [
          { text: 'JavaScript', link: '/FrontEnd/JavaScript/' },
          { text: 'HTML', link: '/FrontEnd/HTML/' },
          { text: 'CSS', link: '/FrontEnd/CSS/' },
          { text: 'TypeScript', link: '/FrontEnd/TypeScript/' },
          { text: 'Vue', link: '/FrontEnd/Vue/' },
          { text: 'React', link: '/FrontEnd/React/' },
        ],
      },
      {
        text: '后端知识',
        items: [
          { text: 'Node', link: '/BackEnd/Node/node_study1' },
          { text: 'Nest', link: '/BackEnd/Nest/' },
          { text: 'Express', link: '/BackEnd/Express/' },
          { text: 'Mysql', link: '/BackEnd/Mysql/' },
          { text: 'Java', link: '/BackEnd/Java/' },
        ],
      },
      {
        text: '手撕代码',
        link: '/CodeTear/',
      },
      {
        text: '源码学习',
        items: [
          {
            text: 'Vue',
            link: '/SourceCode/Vue/',
          },
        ],
      },
      {
        text: '算法学习',
        link: '/Algorithm/',
      },
      {
        text: '浏览器',
        link: '/浏览器/事件循环/',
      },
    ],

    sidebar: {
      '/BackEnd/Node/': [
        {
          text: 'Node.js(介绍)',
          link: '/BackEnd/Node/node_study1',
        },
        {
          text: 'Node.js(npm)',
          link: '/BackEnd/Node/node_study2',
        },
        {
          text: 'Node.js(全局变量)',
          link: '/BackEnd/Node/node_study3',
        },
        {
          text: 'Node.js(path)',
          link: '/BackEnd/Node/node_study4',
        },
      ],
      '/前端工程化/': [
        {
          text: '模块化',
          link: '/前端工程化/模块化',
        },
        {
          text: 'Webpack',
          link: '/前端工程化/Webpack',
        },
      ],
      '/浏览器/': [
        {
          text: '事件循环',
          link: '/浏览器/事件循环',
        },
        {
          text: '浏览器缓存',
          link: '/浏览器/浏览器缓存机制',
        },
        {
          text: '网络通信',
          link: '/浏览器/网络通信',
        },
      ],

      '/TechBlogs/GIS': [
        {
          items: [
            {
              text: 'Openlayers',
              items: [
                {
                  text: 'vue3+vite+openlayers构建第一个地图',
                  link: '/TechBlogs/GIS/OpenLayers/vue3+vite+openlayers构建第一个地图',
                },

                {
                  text: 'vue3+vite+openlayers添加地图基本控件',
                  link: '/TechBlogs/GIS/OpenLayers/vue3+vite+openlayers添加地图基本控件',
                },
                {
                  text: 'vue3+vite+openlayers绘制图形',
                  link: '/TechBlogs/GIS/OpenLayers/vue3+vite+openlayers绘制图形',
                },
              ],
            },
            {
              text: 'MapServer',
              items: [
                {
                  text: '基于mapserver的切片缓存服务配置（mapchache.xml文件）',
                  link: '/TechBlogs/GIS/MapServer/基于mapserver的切片缓存服务配置（mapchache.xml文件）',
                },
              ],
            },
          ],
        },
      ],

      '/TechBlogs/Electron': [
        {
          text: 'electron+vue3+ts+vite 从零开始搭建一个项目(1)',
          link: '/TechBlogs/Electron/electron+vue3+ts+vite 从零开始搭建一个项目(1)',
        },
        {
          text: 'electron+vue3+ts+vite 从零开始搭建一个项目(2)',
          link: '/TechBlogs/Electron/electron+vue3+ts+vite 从零开始搭建一个项目(2)',
        },
        {
          text: 'electron+vue3+ts+vite 从零开始搭建一个项目(3)',
          link: '/TechBlogs/Electron/electron+vue3+ts+vite 从零开始搭建一个项目(3)',
        },
      ],
      '/TechBlogs/': [
        {
          text: '常用git指令总结',
          link: '/TechBlogs/Others/常用git指令总结',
        },
        {
          text: '浏览器中的位置信息',
          link: '/TechBlogs/Others/浏览器中的位置信息',
        },
        {
          text: 'JS小工具(不定期更新...)',
          link: '/TechBlogs/Others/JS小工具(不定期更新...)',
        },
        {
          text: '简易版虚拟滚动',
          link: '/TechBlogs/Others/简易版虚拟滚动',
        },
      ],
      // '/CodeTear/': [
      //   {
      //     text: 'JS',
      //     link: '/CodeTear/JS/',
      //   },
      // ],
    },
    outline: {
      level: [2, 4],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CodingAndSleeping' },
    ],

    search: {
      provider: 'local',
    },
  },
});
