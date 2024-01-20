import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/vitepress-blog/',
  srcDir: 'data',
  title: '路遥知码力',
  // description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      {
        text: '技术博客',
        items: [
          { text: 'GIS', link: '/TechBlogs/GIS/' },
          { text: 'Electron', link: '/TechBlogs/Electron/' },
          { text: '其他', link: '/TechBlogs/Others/' },
        ],
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
          { text: 'Node', link: '/BackEnd/Node/' },
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
        text: '计算机基础',
        items: [
          {
            text: '计算机网络',
            link: '/ComputerKnowledge/ComputerNetwork/',
          },
          {
            text: '浏览器',
            link: '/ComputerKnowledge/BrowserKnowledge/',
          },
        ],
      },
    ],

    sidebar: {
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
                }
              ],
            },
            {
                text: 'MapServer',
                items:[
                  {
                    text: '基于mapserver的切片缓存服务配置（mapchache.xml文件）',
                    link: '/TechBlogs/GIS/MapServer/基于mapserver的切片缓存服务配置（mapchache.xml文件）'
                  }
                ]
            }
          ],
        },
      ],
      
      '/TechBlogs/Electron':[
        {
          text: 'electron+vue3+ts+vite 从零开始搭建一个项目(1)',
          link: '/TechBlogs/Electron/electron+vue3+ts+vite 从零开始搭建一个项目(1)'
        },
        {
          text: 'electron+vue3+ts+vite 从零开始搭建一个项目(2)',
          link: '/TechBlogs/Electron/electron+vue3+ts+vite 从零开始搭建一个项目(2)'
        },
        {
          text: 'electron+vue3+ts+vite 从零开始搭建一个项目(3)',
          link: '/TechBlogs/Electron/electron+vue3+ts+vite 从零开始搭建一个项目(3)'
        },
      ],
      '/TechBlogs/Others':[
        {
          text: '常用git指令总结',
          link: '/TechBlogs/Others/常用git指令总结'
        },
        {
          text: '浏览器中的位置信息',
          link: '/TechBlogs/Others/浏览器中的位置信息'
        },
        {
          text: 'JS小工具(不定期更新...)',
          link: '/TechBlogs/Others/JS小工具(不定期更新...)'
        },
        {
          text: '简易版虚拟滚动',
          link: '/TechBlogs/Others/简易版虚拟滚动'
        },
      ],
      '/CodeTear/': [
        {
          text: 'JS',
          link: '/CodeTear/JS/'
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CodingAndSleeping' },
    ],
  },
})
