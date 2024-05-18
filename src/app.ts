import express, { Request, Response } from 'express';
import { dropCollections } from './db/dropCollections';
import postsRouter from './resources/posts/posts.routes';
import blogsRouter from './resources/blogs/blogs.routes';
import { httpStatutes } from './common/httpStatutes';
import usersRouter from './resources/users/users.routes';
import commentsRouter from './resources/comments/comments.routes';
import authRouter from './resources/auth/auth.routes';
import cookieParser from 'cookie-parser';

export const app = express();
app.use(cookieParser());
const bodyParser = express.json();

app.use(bodyParser);

app.delete('/testing/all-data', async (req: Request, res: Response) => {
  await dropCollections();
  res.sendStatus(httpStatutes.OK_NO_CONTENT_204);
});

app.use(authRouter);
app.use(blogsRouter);
app.use(postsRouter);
app.use(usersRouter);
app.use(commentsRouter);
