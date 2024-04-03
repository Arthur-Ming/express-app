import { ResolutionsEnume } from '../../resources/videos/resolutions.enum';

export interface VideoDbInterface {
  id: number;
  title: string;
  author: string;
  canBeDownloaded: boolean;
  minAgeRestriction: null | number;
  createdAt: string;
  publicationDate: string;
  availableResolutions: ResolutionsEnume[];
}
