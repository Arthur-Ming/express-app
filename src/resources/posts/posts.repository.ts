import { db } from '../../db/db';
import { BlogInputData, BlogOutputData } from '../blogs/interfaces';
import { PostInputData, PostOutputData } from './interfaces';
import { blogsRepository } from '../blogs/blogs.repository';

export const postsRepository = {
  find: () => {
    return db.posts;
  },
  findById: (postId: string) => {
    const foundPost = db.posts.find(({ id }) => id === postId);
    return foundPost;
  },
  create: (input: PostInputData) => {
    const foundBlog = blogsRepository.findById(input.blogId);
    if (!foundBlog) {
      throw new Error(`blog with id ${input.blogId} not found`);
    }
    const newPost: PostOutputData = {
      id: String(db.posts.length > 0 ? Math.max(...db.posts.map(({ id }) => Number(id))) + 1 : 1),
      title: input.title,
      shortDescription: input.shortDescription,
      content: input.content,
      blogId: input.blogId,
      blogName: foundBlog.name,
    };
    db.posts.push(newPost);
    return { id: newPost.id };
  },
  update: (postId: string, input: PostInputData): boolean => {
    const foundPost = db.posts.find(({ id }) => id === postId);
    if (!foundPost) {
      return false;
    }
    for (let i = 0; i < db.posts.length; i++) {
      if (db.posts[i].id === postId) {
        db.posts[i] = {
          id: postId,
          title: input.title,
          shortDescription: input.shortDescription,
          content: input.content,
          blogId: input.blogId,
          blogName: foundPost.blogName,
        };
        break;
      }
    }
    return true;
  },
  remove: (postId: string): boolean => {
    const foundPostIndex = db.posts.findIndex(({ id }) => id === postId);
    if (foundPostIndex === -1) {
      return false;
    }
    db.posts.splice(foundPostIndex, 1);
    return true;
  },
};
