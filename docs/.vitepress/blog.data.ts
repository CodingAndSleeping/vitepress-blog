import path from 'path';
import { defineLoader } from 'vitepress';
import { createContentLoader } from 'vitepress';

type Data = {
  // 页面的映射 URL，如 /posts/hello.html（不包括 base）
  // 手动迭代或使用自定义 `transform` 来标准化路径
  title: string;
  desc: string;
  label: string[];
  url: string;
  date: {
    time: number;
    ZHString: string;
    ENString: string;
  };
};

declare const data: Data[];
export { data };

export default createContentLoader('/**/*.md', {
  excerpt: false, // 包含摘录?
  transform(raw): Data[] {
    return raw
      .filter(({ frontmatter }) => frontmatter.title)
      .map(({ url, frontmatter }) => ({
        title: frontmatter.title,
        desc: frontmatter.desc,
        label: frontmatter.label,
        top: frontmatter.top || false,
        url,
        date: formatDate(frontmatter.date),
      }))
      .sort((a, b) => {
        if (a.top && !b.top) return -1;
        if (!a.top && b.top) return 1;
        return b.date.time - a.date.time; // r
      });
  },
});

function formatDate(raw: string): Data['date'] {
  const date = new Date(raw);
  date.setUTCHours(12);
  return {
    time: +date,
    ZHString: date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    ENString: date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };
}
