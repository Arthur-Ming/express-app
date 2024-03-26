import { req } from './test-helpers';
import { SETTINGS } from '../src/settings';

describe('/', () => {
  it('should get empty array', async () => {
    const res = await req.get('/').expect(200);

    console.log(res.body);
  });
});
