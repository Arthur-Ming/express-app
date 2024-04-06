import { db } from '../../db/db';
import { BlogInputData, BlogOutputData } from './interfaces';
import { BlogDbInterface } from '../../db/dbTypes/blog-db-interface';

export class BlogsRepository {
  private mapToOutput = (blog: BlogDbInterface): BlogOutputData => {
    return {
      id: blog.id,
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
    };
  };

  find = () => {
    return db.blogs.map((dbBlog) => this.mapToOutput(dbBlog));
  };
  findById = (blogId: string) => {
    const foundBlog = db.blogs.find(({ id }) => id === blogId);
    if (!foundBlog) {
      return null;
    }
    return this.mapToOutput(foundBlog);
  };
  create = (input: BlogInputData) => {
    const newBlog: BlogOutputData = {
      id: String(db.blogs.length > 0 ? Math.max(...db.blogs.map(({ id }) => Number(id))) + 1 : 1),
      name: input.name,
      description: input.description,
      websiteUrl: input.websiteUrl,
    };
    db.blogs.push(newBlog);
    return { id: newBlog.id };
  };
  update = (blogId: string, input: BlogInputData): boolean => {
    const foundBlog = db.blogs.find(({ id }) => id === blogId);
    if (!foundBlog) {
      return false;
    }
    for (let i = 0; i < db.blogs.length; i++) {
      if (db.blogs[i].id === blogId) {
        db.blogs[i] = {
          id: blogId,
          name: input.name,
          description: input.description,
          websiteUrl: input.websiteUrl,
        };
        break;
      }
    }
    return true;
  };
  remove = (blogId: string): boolean => {
    const foundBlogIndex = db.blogs.findIndex(({ id }) => id === blogId);
    if (foundBlogIndex === -1) {
      return false;
    }
    db.blogs.splice(foundBlogIndex, 1);
    return true;
  };
}

// export const blogsRepository = {
//   find: () => {
//     return db.blogs;
//   },
//   findById: (blogId: string) => {
//     const foundBlog = db.blogs.find(({ id }) => id === blogId);
//     return foundBlog;
//   },
//   create: (input: BlogInputData) => {
//     const newBlog: BlogOutputData = {
//       id: String(db.blogs.length > 0 ? Math.max(...db.blogs.map(({ id }) => Number(id))) + 1 : 1),
//       name: input.name,
//       description: input.description,
//       websiteUrl: input.websiteUrl,
//     };
//     db.blogs.push(newBlog);
//     return { id: newBlog.id };
//   },
//   update: (blogId: string, input: BlogInputData): boolean => {
//     const foundBlog = db.blogs.find(({ id }) => id === blogId);
//     if (!foundBlog) {
//       return false;
//     }
//     for (let i = 0; i < db.blogs.length; i++) {
//       if (db.blogs[i].id === blogId) {
//         db.blogs[i] = {
//           id: blogId,
//           name: input.name,
//           description: input.description,
//           websiteUrl: input.websiteUrl,
//         };
//         break;
//       }
//     }
//     return true;
//   },
//   remove: (blogId: string): boolean => {
//     const foundBlogIndex = db.blogs.findIndex(({ id }) => id === blogId);
//     if (foundBlogIndex === -1) {
//       return false;
//     }
//     db.blogs.splice(foundBlogIndex, 1);
//     return true;
//   },
//   mapToOutput(blog: BlogDbInterface): BlogOutputData {
//     return {
//       id: blog.id,
//       name: blog.name,
//       description: blog.description,
//       websiteUrl: blog.websiteUrl,
//     };
//   },
// };
