import { LikesDbInterface } from './likes-db-interface';
import { ObjectId } from 'mongodb';

export interface CommentsLikesDbInterface extends LikesDbInterface {
  commentId: ObjectId;
}
