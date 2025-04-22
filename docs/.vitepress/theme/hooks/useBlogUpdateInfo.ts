import moment from 'moment';
import { Data } from '../../blog.data';
import { computed } from 'vue';

const useBlogUpdateInfo = (blogs: Data[]) => {
  const now = moment();

  const blogsInThisMonth = computed<Data[]>(() => {
    return blogs.filter((blog) => {
      const blogDate = moment(blog.date.time);

      return blogDate.isSame(now, 'year') && blogDate.isSame(now, 'month');
    });
  });

  const blogsInThisWeek = computed<Data[]>(() => {
    const startOfWeek = now.clone().startOf('isoWeek');
    const endOfWeek = now.clone().endOf('isoWeek');

    return blogs.filter((blog) => {
      const blogDate = moment(blog.date.time);
      return blogDate.isBetween(startOfWeek, endOfWeek);
    });
  });
  return {
    blogsInThisMonth,
    blogsInThisWeek,
  };
};

export default useBlogUpdateInfo;
