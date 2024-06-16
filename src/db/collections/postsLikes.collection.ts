import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { PostsLikesDbInterface } from '../dbTypes/posts-likes-db-interface';

const { Schema } = mongoose;

const postsLikesSchema = new Schema<PostsLikesDbInterface>({
  createdAt: { type: Date, default: Date.now },
  postId: { type: ObjectId },
  authorId: { type: ObjectId },
  status: { type: String },
});
export const PostsLikes = mongoose.model('posts_likes', postsLikesSchema);
