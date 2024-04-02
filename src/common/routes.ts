enum resources {
  base = '/',
  videos = 'videos',
  blogs = 'blogs',
}

export default {
  base: resources.base,
  videos: `/${resources.videos}`,
  videosById: `/${resources.videos}/:id`,
};
