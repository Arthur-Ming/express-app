import { app } from './app';
import config from './common/config';
import { connectToDB } from './db/db';

app.listen(config.port, async () => {
  await connectToDB();
  console.log('...server started');
});
