import express, { Request, Response } from 'express';
import videosRouter from './resources/videos/videos.routes';
import { setDB } from './db/db';
import postsRouter from './resources/posts/posts.routes';
import blogsRouter from './resources/blogs/blogs.routes';

export const app = express();

const bodyParser = express.json();

app.use(bodyParser);

app.delete('/testing/all-data', (req: Request, res: Response) => {
  setDB();
  res.sendStatus(204);
});

app.use(videosRouter);
app.use(postsRouter);
app.use(blogsRouter);
