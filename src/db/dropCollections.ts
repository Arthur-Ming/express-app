import { blogCollection } from './blog.collection';
import { postCollection } from './post.collection';

export const dropCollections = async () => {
  await blogCollection.drop();
  await postCollection.drop();
};
