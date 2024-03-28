import { app } from './app';
import config from './common/config';

app.listen(config.port, () => {
  console.log('...server started');
});
