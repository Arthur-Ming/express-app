import { db } from './db';
import { CommentsDbInterface } from './dbTypes/comments-db-interface';

export const commentsCollection = db.collection<CommentsDbInterface>('comments');
