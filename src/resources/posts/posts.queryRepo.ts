import { ObjectId } from 'mongodb';
import { PostJoinedBlogDB, PostOutputData, PostsPaginationParams } from './types/interfaces';
import { postCollection } from '../../db/post.collection';
import { PostsRepository } from './posts.repository';
import { Pagination } from '../../common/types/interfaces';

const postsRepository = new PostsRepository();
export class PostsQueryRepo {
  private mapToOutput = (post: PostJoinedBlogDB): PostOutputData => {
    return {
      id: post._id.toString(),
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId.toString(),
      blogName: post.blogName,
      createdAt: post.createdAt,
    };
  };

  private joinOptions = () => {
    return [
      {
        $lookup: {
          from: 'blogs',
          localField: 'blogId',
          foreignField: '_id',
          as: 'blog',
        },
      },
      {
        $addFields: {
          blogInfo: { $mergeObjects: [{ $arrayElemAt: ['$blog', 0] }] },
        },
      },

      {
        $project: {
          _id: 1,
          title: 1,
          shortDescription: 1,
          content: 1,
          blogName: '$blogInfo.name',
          blogId: 1,
        },
      },
    ];
  };

  private queryParamsOptions = (queryParams: PostsPaginationParams) => {
    return [
      { $sort: { [queryParams.sortBy]: queryParams.sortDirection === 'asc' ? 1 : -1 } },
      { $skip: (queryParams.pageNumber - 1) * queryParams.pageSize },
      { $limit: queryParams.pageSize },
    ];
  };

  find = async (
    queryParams: PostsPaginationParams,
    blogId?: string
  ): Promise<Pagination<PostOutputData[]>> => {
    const totalCount = await postsRepository.getTotalCount(queryParams, blogId);

    const items = (await postCollection
      .aggregate([
        {
          $match: { blogId: blogId ? new ObjectId(blogId) : { $exists: true } },
        },
        ...this.joinOptions(),
        ...this.queryParamsOptions(queryParams),
      ])
      .toArray()) as PostJoinedBlogDB[];

    return {
      pagesCount: Math.ceil(totalCount / queryParams.pageSize),
      page: queryParams.pageNumber,
      pageSize: queryParams.pageSize,
      totalCount: totalCount,
      items: items.map((item) => this.mapToOutput(item)),
    };
  };

  findById = async (postId: string) => {
    const posts = (await postCollection
      .aggregate([
        {
          $match: { _id: new ObjectId(postId) },
        },
        ...this.joinOptions(),
      ])
      .toArray()) as PostJoinedBlogDB[];
    if (!posts || !posts[0]) {
      return null;
    }

    return this.mapToOutput(posts[0]);
  };
}