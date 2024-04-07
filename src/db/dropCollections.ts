import { blogCollection } from './blog.collection';

export const dropCollections = async () => {
  await blogCollection.drop();
};
