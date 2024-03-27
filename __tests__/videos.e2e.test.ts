import { req } from './test-helpers';
import config from '../src/common/config';

describe('/', () => {
  it('should get empty array', async () => {
    const res = await req.get('/').expect(200);

    console.log(res.body);
  });
});
