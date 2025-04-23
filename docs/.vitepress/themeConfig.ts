import { DefaultTheme } from 'vitepress';

const nav: DefaultTheme.Config['nav'] = [
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
        link: '/后端知识/Node/1.Node.js(介绍)',
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
    link: '/前端工程化/1.前端模块化',
  },
  {
    text: '手撕代码',
    link: '/手撕代码/1.手写 new',
  },
  {
    text: '源码学习',
    items: [
      {
        text: 'Vue',
        link: '/源码学习/Vue/',
      },
    ],
  },
  {
    text: '浏览器',
    link: '/浏览器/1.事件循环机制',
  },
  {
    text: '网络通信',
    link: '/网络通信/1.OSI七层网络模型',
  },

  {
    text: '其他',
    link: '/其他/1.一个基于 React + MapboxGL 的地图组件库',
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
    ],
  },
];

export default {
  // https://vitepress.dev/reference/default-theme-config
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

  title: 'CAS BLOG',
  blogLabels: [
    'JavaScript',
    'HTML',
    'CSS',
    'TypeScript',
    'Vue',
    'React',
    'Node',
    'Nest',
    'Express',
    'MySQL',
    '前端工程化',
    '浏览器',
    '源码学习',
    '网络通信',
    '其他',
  ],
} as DefaultTheme.Config & {
  // 新增的配置项
  avatar?: string;
  title?: string;
  blogLabels?: string[];
  quoteOptions?: {
    quotes?: string[];
    interval?: number;
  };
};
