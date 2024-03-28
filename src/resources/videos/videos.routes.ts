import { Router } from 'express';
import routes from '../../common/routes';
import { addVideo, getVideos, getVideosById, removeVideo, updateVideo } from './videos.controllers';

const videosRouter = Router();

videosRouter.get(routes.videos, getVideos);
videosRouter.get(routes.videosById, getVideosById);
videosRouter.post(routes.videos, addVideo);
videosRouter.put(routes.videosById, updateVideo);
videosRouter.delete(routes.videosById, removeVideo);

export default videosRouter;
