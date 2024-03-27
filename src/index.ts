import { app } from './app';
import config from './common/config';
import { resolutions } from './db/resolutions.enum';

app.listen(config.port, () => {
  console.log('...server started');
});
