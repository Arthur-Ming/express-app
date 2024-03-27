import express from 'express';
import videosRouter from './resources/videos/videos.routes';

export const app = express();

const bodyParser = express.json();

app.use(bodyParser);

app.use(videosRouter);
