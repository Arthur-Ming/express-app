import { resources } from './types/enum';

export default {
  base: resources.base,
  posts: `/${resources.posts}`,
  postById: `/${resources.posts}/:id`,
  postForBlog: `/${resources.blogs}/:blogId/${resources.posts}`,
  blogs: `/${resources.blogs}`,
  blogById: `/${resources.blogs}/:id`,
};
