import { db } from '../../db/db';
import { VideoDBType } from '../../db/video-db-type';
import { ResolutionsEnume } from './resolutions.enum';

export const add = (videosInputBody: {
  title: string;
  author: string;
  availableResolutions: ResolutionsEnume[];
}) => {
  const newVideo: VideoDBType = {
    id: db.videos.length > 0 ? Math.max(...db.videos.map(({ id }) => id)) + 1 : 0,
    title: videosInputBody.title,
    author: videosInputBody.author,
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolution: videosInputBody.availableResolutions,
  };

  db.videos.push(newVideo);
  return newVideo;
};

export const getById = (videoId: VideoDBType['id']) => {
  const foundVideo = db.videos.find(({ id }) => id === videoId);
  return foundVideo;
};

export const removeById = (videoId: VideoDBType['id']) => {
  const foundVideoIndex = db.videos.findIndex(({ id }) => id === videoId);
  db.videos.splice(foundVideoIndex, 1);
};
