import express, { Request, Response } from 'express';
import { dropCollections } from './db/dropCollections';
import postsRouter from './resources/posts/posts.routes';
import blogsRouter from './resources/blogs/blogs.routes';
import { httpStatutes } from './common/httpStatutes';

export const app = express();

const bodyParser = express.json();

app.use(bodyParser);

app.delete('/testing/all-data', async (req: Request, res: Response) => {
  await dropCollections();
  res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
});

app.use(blogsRouter);
app.use(postsRouter);
