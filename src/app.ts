import express, { Request, Response } from 'express';
import videosRouter from './resources/videos/videos.routes';
import { setDB } from './db/db';

export const app = express();

const bodyParser = express.json();

app.use(bodyParser);

app.delete('/testing/all-data', (req: Request, res: Response) => {
  setDB();
  res.sendStatus(204);
});

app.use(videosRouter);
