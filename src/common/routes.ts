enum resources {
  base = '/',
  videos = 'videos',
  blogs = 'blogs',
  posts = 'posts',
}

export default {
  base: resources.base,
  videos: `/${resources.videos}`,
  videosById: `/${resources.videos}/:id`,
  posts: `/${resources.posts}`,
  postById: `/${resources.posts}/:id`,
  blogs: `/${resources.blogs}`,
  blogById: `/${resources.blogs}/:id`,
};
