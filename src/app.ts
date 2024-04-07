import express, { Request, Response } from 'express';
import { dropCollections } from './db/dropCollections';
import postsRouter from './resources/posts/posts.routes';
import blogsRouter from './resources/blogs/blogs.routes';

export const app = express();

const bodyParser = express.json();

app.use(bodyParser);

app.delete('/testing/all-data', async (req: Request, res: Response) => {
  await dropCollections();
  res.sendStatus(204);
});

// app.use(postsRouter);
app.use(blogsRouter);
