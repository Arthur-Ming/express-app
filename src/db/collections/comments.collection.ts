import { CommentsDbInterface } from '../dbTypes/comments-db-interface';
import mongoose from 'mongoose';

import { ObjectId } from 'mongodb';

const { Schema } = mongoose;

const commentSchema = new Schema<CommentsDbInterface>({
  content: { type: String },
  createdAt: { type: Date, default: Date.now },
  userId: { type: ObjectId },
  postId: { type: ObjectId },
});
export const Comments = mongoose.model('comments', commentSchema);
