import { ObjectId } from 'mongodb';

export interface PostDbInterface {
  title: string;
  shortDescription: string;
  content: string;
  blogId: ObjectId;
  blogName: string;
  createdAt: Date;
}
