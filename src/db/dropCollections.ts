import { blogCollection } from './blog.collection';
import { postCollection } from './post.collection';
import { userCollection } from './user.collection';
import { commentsCollection } from './comments.collection';

export const dropCollections = async () => {
  await blogCollection.drop();
  await postCollection.drop();
  await userCollection.drop();
  await commentsCollection.drop();
};
