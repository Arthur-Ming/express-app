import { db } from './db';
import { BlogDbInterface } from './dbTypes/blog-db-interface';

export const blogCollection = db.collection<BlogDbInterface>('blogs');
