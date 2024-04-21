import { WithId } from 'mongodb';
import { BlogDbInterface } from '../../../db/dbTypes/blog-db-interface';
import { BlogOutputData } from '../types/interfaces';

export const mapToOutput = (dbBlog: WithId<BlogDbInterface>): BlogOutputData => {
  return {
    id: dbBlog._id.toString(),
    name: dbBlog.name,
    description: dbBlog.description,
    websiteUrl: dbBlog.websiteUrl,
    createdAt: dbBlog.createdAt,
    isMembership: dbBlog.isMembership,
  };
};
