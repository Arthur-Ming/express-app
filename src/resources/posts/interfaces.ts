import { ObjectId } from 'mongodb';

export interface PostInputData {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
}

export interface PostOutputData {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: Date;
}
