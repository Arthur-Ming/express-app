import { BlogInputData } from '../types/interfaces';

export const mapToUpdateBlog = (input: BlogInputData): BlogInputData => {
  return {
    name: input.name,
    description: input.description,
    websiteUrl: input.websiteUrl,
  };
};
