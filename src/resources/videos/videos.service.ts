import { db } from '../../db/db';
import { VideoDBType } from '../../db/video-db-type';
import { ResolutionsEnume } from './resolutions.enum';
import { UpdateVideoBody } from './types';

export const add = (videosInputBody: {
  title: string;
  author: string;
  availableResolutions: ResolutionsEnume[];
}) => {
  const createdAt = Date.now();
  const newVideo: VideoDBType = {
    id: db.videos.length > 0 ? Math.max(...db.videos.map(({ id }) => id)) + 1 : 1,
    title: videosInputBody.title,
    author: videosInputBody.author,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date(createdAt).toISOString(),
    publicationDate: new Date(createdAt + 1000 * 24 * 60 * 60).toISOString(),
    availableResolutions: videosInputBody.availableResolutions,
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

export const updateById = (videoId: VideoDBType['id'], body: UpdateVideoBody) => {
  db.videos = db.videos.map((video) => {
    if (videoId === video.id) {
      return {
        ...video,
        ...body,
      };
    }
    return video;
  });
};
