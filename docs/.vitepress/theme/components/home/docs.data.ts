import { createContentLoader } from 'vitepress';

type Data = {
  // 页面的映射 URL，如 /posts/hello.html（不包括 base）
  // 手动迭代或使用自定义 `transform` 来标准化路径
  url: string;
  // 页面的 frontmatter 数据
  frontmatter: Record<string, any>;
};

declare const data: Data;
export { data };

export default createContentLoader('posts/*.md');
