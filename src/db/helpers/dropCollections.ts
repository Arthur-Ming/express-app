import { db } from '../db';

export const dropCollections = async () => {
  const collections = await db.collections();
  await Promise.all(collections.map((c) => c.drop()));
};
