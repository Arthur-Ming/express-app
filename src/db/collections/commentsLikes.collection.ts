import mongoose from 'mongoose';

import { ObjectId } from 'mongodb';
import { CommentsLikesDbInterface } from '../dbTypes/comments-likes-db-interface';

const { Schema } = mongoose;

const commentsLikesSchema = new Schema<CommentsLikesDbInterface>({
  createdAt: { type: Date, default: Date.now },
  commentId: { type: ObjectId },
  authorId: { type: ObjectId },
  status: { type: String },
});
export const CommentsLikes = mongoose.model('comments_likes', commentsLikesSchema);
