import { PostDbInterface } from '../dbTypes/post-db-interface';
import mongoose from 'mongoose';

import { ObjectId } from 'mongodb';

const { Schema } = mongoose;

const postSchema = new Schema<PostDbInterface>({
  title: { type: String },
  shortDescription: { type: String },
  content: { type: String },
  blogId: { type: ObjectId },
  createdAt: { type: Date, default: Date.now },
});

export const Posts = mongoose.model('posts', postSchema);
