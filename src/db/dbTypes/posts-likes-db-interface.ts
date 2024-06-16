import { LikesDbInterface } from './likes-db-interface';
import { ObjectId } from 'mongodb';

export interface PostsLikesDbInterface extends LikesDbInterface {
  postId: ObjectId;
}
