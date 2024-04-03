import { DBType } from '../src/db/db';
import { VideoDbInterface } from '../src/db/dbTypes/video-db-interface';
import { ResolutionsEnume } from '../src/resources/videos/resolutions.enum';

export const video1: VideoDbInterface = {
  id: 1,
  title: 'some title',
  author: 'Art',
  canBeDownloaded: true,
  minAgeRestriction: null,
  createdAt: new Date().toISOString(),
  publicationDate: new Date().toISOString(),
  availableResolutions: [ResolutionsEnume.P240],
};

export const dataset1: DBType = {
  videos: [video1],
};
