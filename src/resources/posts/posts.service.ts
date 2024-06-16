import { PostsRepository } from './posts.repository';
import { PostInputData, PostInputDataForSpecificBlog, PostOutputData } from './types/interfaces';
import { WithId } from 'mongodb';
import { PostDbInterface } from '../../db/dbTypes/post-db-interface';
import { BlogDbInterface } from '../../db/dbTypes/blog-db-interface';
import { BlogsRepository } from '../blogs/blogs.repository';

const postsRepository = new PostsRepository();
const blogsRepository = new BlogsRepository();

export class PostsService {
  private mapToCreatePost = <T extends PostInputDataForSpecificBlog>(
    input: T,
    blog: WithId<BlogDbInterface>
  ): PostDbInterface => {
    return {
      title: input.title,
      shortDescription: input.shortDescription,
      content: input.content,
      blogId: blog._id,
      createdAt: new Date(),
    };
  };

  addPostForSpecificBlog = async (blogId: string, input: PostInputDataForSpecificBlog) => {
    const blog = await blogsRepository.findById(blogId);

    if (!blog) {
      throw new Error(`blog with id ${blogId} not found`);
    }
    const newPost = this.mapToCreatePost(input, blog);
    const createdPost = await postsRepository.add(newPost);

    return createdPost ? createdPost : null;
  };

  addPost = async (input: PostInputData) => {
    return this.addPostForSpecificBlog(input.blogId, input);
  };
}
