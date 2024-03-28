import { ResolutionsEnume } from '../resources/videos/resolutions.enum';

export type VideoDBType = {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: null;
  createdAt: string;
  publicationDate: string;
  availableResolution: ResolutionsEnume[];
};
