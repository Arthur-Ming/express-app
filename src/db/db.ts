import { VideoDbInterface } from './dbTypes/video-db-interface';
import { BlogDbInterface } from './dbTypes/blog-db-interface';
import { PostDbInterface } from './dbTypes/post-db-interface';

export type DBType = {
  videos: VideoDbInterface[];
  blogs: BlogDbInterface[];
  posts: PostDbInterface[];
};

export const db: DBType = {
  videos: [],
  blogs: [],
  posts: [],
};

export const setDB = (dataset?: Partial<DBType>) => {
  if (!dataset) {
    db.videos = [];
    db.blogs = [];
    db.posts = [];
    return;
  }

  db.videos = dataset.videos || db.videos;
  db.blogs = dataset.blogs || db.blogs;
  db.posts = dataset.posts || db.posts;
};
