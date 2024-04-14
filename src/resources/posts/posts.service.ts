import { PostsRepository } from './posts.repository';
import { BlogsRepository } from '../blogs/blogs.repository';
import { addPostForSpecificBlog } from './posts.controller';
import { PostInputDataForSpecificBlog } from './interfaces';

const postsRepository = new PostsRepository();
const blogsRepository = new BlogsRepository();
export class PostsService {
  addPostForSpecificBlog = async (blogId: string, input: PostInputDataForSpecificBlog) => {
    const { id: createdPostId } = await postsRepository.add({
      title: input.title,
      shortDescription: input.shortDescription,
      content: input.content,
      blogId: blogId,
    });
    const createdPost = await postsRepository.findById(createdPostId);
    return createdPost;
  };
}
