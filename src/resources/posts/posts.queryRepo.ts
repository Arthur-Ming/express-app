import { ObjectId } from 'mongodb';
import { PostJoinedBlogDB, PostOutputData, PostsPaginationParams } from './types/interfaces';
import { Posts } from '../../db/collections/post.collection';
import { PostsRepository } from './posts.repository';
import { Pagination } from '../../common/types/interfaces';
import { LikeStatus } from '../../db/dbTypes/likes-db-interface';
import { CommentsLikesDbInterface } from '../../db/dbTypes/comments-likes-db-interface';
import { PostsLikesDbInterface } from '../../db/dbTypes/posts-likes-db-interface';
import { PostsLikes } from '../../db/collections/postsLikes.collection';

const postsRepository = new PostsRepository();

const getCurrentUserLikeStatus = (
  likes: PostsLikesDbInterface[],
  currentUserId?: string
): LikeStatus => {
  if (!currentUserId) {
    return LikeStatus.None;
  }
  const currentUserLike = likes.find((like) => like.authorId.toString() === currentUserId);
  if (!currentUserLike) {
    return LikeStatus.None;
  }

  return currentUserLike.status;
};
export class PostsQueryRepo {
  private mapToOutput = (post: PostJoinedBlogDB, requestUserId?: string): PostOutputData => {
    return {
      id: post._id.toString(),
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId.toString(),
      blogName: post.blogName,
      createdAt: post.createdAt,
      extendedLikesInfo: {
        likesCount: post.likes.filter((like) => like.status === LikeStatus.Like).length,
        dislikesCount: post.likes.filter((like) => like.status === LikeStatus.Dislike).length,
        myStatus: getCurrentUserLikeStatus(post.likes, requestUserId),
        newestLikes: post.likes
          .sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)))
          .map((like) => ({
            addedAt: like.createdAt.toISOString(),
            userId: like.likeAuthor?._id ? like.likeAuthor._id.toString() : null,
            login: like.likeAuthor?.login ? like.likeAuthor.login : null,
          }))
          .slice(0, 3),
      },
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
        $lookup: {
          from: 'posts_likes',
          localField: '_id',
          foreignField: 'postId',
          as: 'likes',
          pipeline: [
            {
              $lookup: {
                from: 'users',
                localField: 'authorId',
                foreignField: '_id',
                as: 'likeAuthors',
              },
            },
            {
              $addFields: {
                likeAuthor: { $mergeObjects: [{ $arrayElemAt: ['$likeAuthors', 0] }] },
              },
            },
          ],
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
          createdAt: 1,
          likes: 1,
          likeAuthor: 1,
        },
      },
    ];
  };

  find = async (
    queryParams: PostsPaginationParams,
    blogId?: string,
    requestUserId?: string
  ): Promise<Pagination<PostOutputData[]>> => {
    const totalCount = await postsRepository.getTotalCount(queryParams, blogId);

    const items = await Posts.aggregate([
      {
        $match: { blogId: blogId ? new ObjectId(blogId) : { $exists: true } },
      },
      ...this.joinOptions(),
      { $sort: { [queryParams.sortBy]: queryParams.sortDirection === 'asc' ? 1 : -1 } },
      { $skip: (queryParams.pageNumber - 1) * queryParams.pageSize },
      { $limit: queryParams.pageSize },
    ]);

    const likeAuthors = await PostsLikes.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'authorId',
          as: 'likeAuthors',
        },
      },
    ]);
    console.log(
      items.forEach((item) => {
        console.log(item.likes[0]);
      })
    );
    console.log(likeAuthors);
    return {
      pagesCount: Math.ceil(totalCount / queryParams.pageSize),
      page: queryParams.pageNumber,
      pageSize: queryParams.pageSize,
      totalCount: totalCount,
      items: items.map((item) => this.mapToOutput(item)),
    };
  };

  findById = async (postId: string, requestUserId?: string) => {
    const posts = await Posts.aggregate([
      {
        $match: { _id: new ObjectId(postId) },
      },
      ...this.joinOptions(),
    ]);

    if (!posts || !posts[0]) {
      return null;
    }

    return this.mapToOutput(posts[0]);
  };
}
