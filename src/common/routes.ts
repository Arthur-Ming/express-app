enum resources {
  base = '/',
  videos = 'videos',
}

export default {
  base: resources.base,
  videos: `/${resources.videos}`,
  videosById: `/${resources.videos}/:id`,
};
