import { BlogDbInterface } from '../dbTypes/blog-db-interface';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const blogSchema = new Schema<BlogDbInterface>(
  {
    name: { type: String },
    description: { type: String },
    websiteUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    isMembership: { type: Boolean },
  },
  { versionKey: false }
);

export const Blogs = mongoose.model('blogs', blogSchema);
