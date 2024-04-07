import { db } from './db';
import { PostDbInterface } from './dbTypes/post-db-interface';

export const postCollection = db.collection<PostDbInterface>('posts');
