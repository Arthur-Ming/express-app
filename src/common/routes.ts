import { resources } from './types/enum';

export default {
  base: resources.base,
  posts: `/${resources.posts}`,
  postById: `/${resources.posts}/:id`,
  postForBlog: `/${resources.blogs}/:blogId/${resources.posts}`,
  blogs: `/${resources.blogs}`,
  blogById: `/${resources.blogs}/:id`,
  users: `/${resources.users}`,
  userById: `/${resources.users}/:id`,
  authLogin: `/${resources.auth}/login`,
  authRegistration: `/${resources.auth}/registration`,
  authRegistrationConfirmation: `/${resources.auth}/registration-confirmation`,
  authMe: `/${resources.auth}/me`,
  comments: `/${resources.comments}`,
  commentById: `/${resources.comments}/:id`,
  commentBySpecifiedId: `/${resources.comments}/:commentId`,
  commentBySpecifiedPostId: `/${resources.posts}/:postId/comments`,
};
