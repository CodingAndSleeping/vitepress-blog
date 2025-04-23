import { DefaultTheme } from 'vitepress';

const nav: DefaultTheme.Config['nav'] = [
  {
    text: '前端知识',
    items: [
      { text: 'JavaScript', link: '/前端/JavaScript/' },
      { text: 'HTML', link: '/前端/HTML/' },
      { text: 'CSS', link: '/前端/CSS/' },
      { text: 'TypeScript', link: '/前端/TypeScript/' },
      { text: 'Vue', link: '/前端/Vue/' },
      { text: 'React', link: '/前端/React/' },
    ],
  },

  {
    text: '后端知识',
    items: [
      { text: 'Node', link: '/后端/Node/node_study1' },
      { text: 'Nest', link: '/后端/Nest/' },
      { text: 'Express', link: '/后端/Express/' },
      { text: 'Mysql', link: '/后端/MySQL/' },
    ],
  },
  {
    text: '前端工程化',
    link: '/前端工程化/模块化.md',
  },
  {
    text: '手撕代码',
    link: '/手撕代码/new',
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
    text: '浏览器',
    link: '/浏览器/事件循环/',
  },
  {
    text: '网络通信',
    link: '/网络通信/OSI七层网络模型',
  },

  {
    text: '其他',
    link: '/其他/react+mapboxgl地图文档.md',
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

const sidebar: DefaultTheme.Config['sidebar'] = {
  '/后端/Node/': [
    {
      text: 'Node.js(介绍)',
      link: '/后端/Node/node_study1',
    },
    {
      text: 'Node.js(npm)',
      link: '/后端/Node/node_study2',
    },
    {
      text: 'Node.js(全局变量)',
      link: '/后端/Node/node_study3',
    },
    {
      text: 'Node.js(path)',
      link: '/后端/Node/node_study4',
    },
    {
      text: 'Node.js(os)',
      link: '/后端/Node/node_study5',
    },
    {
      text: 'Node.js(process)',
      link: '/后端/Node/node_study6',
    },
    {
      text: 'Node.js(child_process)',
      link: '/后端/Node/node_study7',
    },
    {
      text: 'Node.js(events)',
      link: '/后端/Node/node_study8',
    },
    {
      text: 'Node.js(util)',
      link: '/后端/Node/node_study9',
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
      text: '跨标签页通信',
      link: '/浏览器/跨标签页通信',
    },
  ],
  '/网络通信/': [
    {
      text: 'OSI七层网络模型',
      link: '/网络通信/OSI七层网络模型',
    },
    {
      text: 'TCP三次握手与四次挥手',
      link: '/网络通信/TCP三次握手与四次挥手',
    },
    {
      text: 'DNS 解析规则',
      link: '/网络通信/DNS解析规则',
    },
    {
      text: 'OPTIONS 预检请求',
      link: '/网络通信/OPTIONS预检请求',
    },
    {
      text: '浏览器缓存',
      link: '/网络通信/浏览器缓存机制',
    },

    {
      text: 'HTTP1.0、1.1、2.0的区别',
      link: '/网络通信/HTTP1.0、1.1、2.0的区别',
    },

    // {
    //   text: 'HTTP、HTTPS的区别',
    //   link: '/网络通信/HTTP、HTTPS的区别',
    // },
  ],

  '/手撕代码/': [
    {
      text: '手写new',
      link: '/手撕代码/new',
    },
    {
      text: '手写instanceof',
      link: '/手撕代码/instanceof',
    },
    {
      text: '手写bind-apply-call',
      link: '/手撕代码/bind-apply-call',
    },
    {
      text: '手写deepclone',
      link: '/手撕代码/deepclone',
    },
    {
      text: '手写debounce',
      link: '/手撕代码/debounce',
    },
    {
      text: '手写throttle',
      link: '/手撕代码/throttle',
    },
    {
      text: '手写promise',
      link: '/手撕代码/promise',
    },
    {
      text: '手写lazyBoy',
      link: '/手撕代码/lazyBoy',
    },
    {
      text: '手写洗牌算法',
      link: '/手撕代码/durstenfeldShuffle',
    },
    {
      text: '手写Promise.all/race',
      link: '/手撕代码/promiseAll',
    },
    {
      text: '求数组除自身以外乘积',
      link: '/手撕代码/productExceptSelf',
    },
    {
      text: '扁平化数组',
      link: '/手撕代码/flattenArr',
    },
    {
      text: '红绿灯',
      link: '/手撕代码/red-green-light',
    },
    {
      text: '大数相加',
      link: '/手撕代码/bigint',
    },

    {
      text: '无缝轮播图',
      link: '/手撕代码/无缝轮播图',
    },
  ],

  '/其他/': [
    {
      text: '地图组件库',
      link: '/其他/react+mapboxgl地图文档',
    },
    {
      text: 'mapserver地图切片',
      link: '/其他/基于mapserver的切片缓存服务配置（mapchache.xml文件）',
    },
    {
      text: '一个简单的虚拟滚动',
      link: '/其他/简易版虚拟滚动',
    },
    {
      text: '简述浏览器中的位置',
      link: '/其他/浏览器中的位置信息',
    },
    {
      text: 'js小工具',
      link: '/其他/js小工具',
    },
  ],
};

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
  sidebar,

  title: 'CAS BLOG',
} as DefaultTheme.Config & {
  // 新增的配置项
  avatar?:string;
  title?: string;
  quoteOptions?: {
    quotes?: string[];
    interval?: number;
  };
};
