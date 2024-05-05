import { ObjectId } from 'mongodb';

export interface PostDbInterface {
  title: string;
  shortDescription: string;
  content: string;
  blogId: ObjectId;
  createdAt: Date;
}
