enum resources {
  base = '/',
  blogs = 'blogs',
  posts = 'posts',
}

export default {
  base: resources.base,
  posts: `/${resources.posts}`,
  postById: `/${resources.posts}/:id`,
  blogs: `/${resources.blogs}`,
  blogById: `/${resources.blogs}/:id`,
};
