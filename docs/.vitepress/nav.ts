import { DefaultTheme } from 'vitepress';

const nav: DefaultTheme.Config['nav'] = [
  {
    text: '博客文章',
    link: '/博客文章/',
  },
  {
    text: '前端知识',
    items: [
      {
        text: 'JavaScript',
        link: '/前端知识/JavaScript/',
      },
      {
        text: 'HTML',
        link: '/前端知识/HTML/',
      },
      {
        text: 'CSS',
        link: '/前端知识/CSS/',
      },
      {
        text: 'TypeScript',
        link: '/前端知识/TypeScript/',
      },
      {
        text: 'Vue',
        link: '/前端知识/Vue/',
      },
      {
        text: 'React',
        link: '/前端知识/React/',
      },
    ],
  },
  {
    text: '后端知识',
    items: [
      {
        text: 'Node',
        link: '/后端知识/Node/',
      },
      {
        text: 'Express',
        link: '/后端知识/Express/',
      },
      {
        text: 'MySQL',
        link: '/后端知识/MySQL/',
      },
      {
        text: 'Nest',
        link: '/后端知识/Nest/',
      },
    ],
  },
  {
    text: '前端工程化',
    link: '/前端工程化/',
  },
  {
    text: '手撕代码',
    link: '/手撕代码/',
  },
  {
    text: '源码学习',
    items: [
      {
        text: 'Vue',
        link: '/源码学习/Vue/',
      },
      {
        text: 'React',
        link: '/源码学习/React/',
      },
    ],
  },
  {
    text: '浏览器',
    link: '/浏览器/',
  },
  {
    text: '网络通信',
    link: '/网络通信/',
  },

  {
    text: '个人项目',
    items: [
      {
        text: 'react 练习广场 🔥',
        link: 'https://codingandsleeping.github.io/react-playground/',
        target: '_blank',
        rel: 'sponsored',
      },
      {
        text: 'babel 插件练习广场 🔥',
        link: 'https://codingandsleeping.github.io/babel-plugin-playground/',
        target: '_blank',
        rel: 'sponsored',
      },
      {
        text: '地图组件库 🔥',
        link: 'https://codingandsleeping.github.io/react-mapboxgl-zt/',
        target: '_blank',
        rel: 'sponsored',
      },
      {
        text: '图片在线压缩器 🔥',
        link: 'https://codingandsleeping.github.io/image-compressor/',
        target: '_blank',
        rel: 'sponsored',
      },
      {
        text: 'CLI - pnpm catalog 自动导入 🔥',
        link: 'https://github.com/CodingAndSleeping/padc',
        target: '_blank',
        rel: 'sponsored',
      },
    ],
  },
];

export default nav;
