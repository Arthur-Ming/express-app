import { BlogInputData } from '../types/interfaces';
import { BlogDbInterface } from '../../../db/dbTypes/blog-db-interface';

export const mapToCreateBlog = (input: BlogInputData): BlogDbInterface => {
  return {
    name: input.name,
    description: input.description,
    websiteUrl: input.websiteUrl,
    createdAt: new Date(),
    isMembership: false,
  };
};
