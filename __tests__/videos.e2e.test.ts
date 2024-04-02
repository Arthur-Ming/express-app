import { req } from './test-helpers';
import routes from '../src/common/routes';
import { httpStatutes } from '../src/common/httpStatutes';
import { db } from '../src/db/db';

describe('/videos', () => {
  beforeAll(async () => {
    await req.delete('/testing/all-data');
  });
  it('should get empty array', async () => {
    const res = await req.get(routes.videos).expect(200);
    expect(res.body).toEqual([]);
  });
  it('should not create entity with incorrect input data', async function () {
    const postRes = await req
      .post('/videos')
      .send({
        title: '',
        author: '',
        availableResolutions: [],
      })
      .expect(httpStatutes.BAD_REQUEST_400);
    expect(postRes.body).toMatchObject({
      errorsMessages: [
        { message: expect.any(String), field: 'title' },
        { message: expect.any(String), field: 'author' },
        { message: expect.any(String), field: 'availableResolutions' },
      ],
    });
    const getRes = await req.get('/videos/');
    expect(getRes.body).toEqual([]);
  });
  it('should not create entity with correct input data', async function () {
    const postRes = await req
      .post('/videos')
      .send({
        title: 'some title',
        author: 'Art',
        availableResolutions: ['P144'],
      })
      .expect(httpStatutes.CREATED_201);

    expect(postRes.body).toMatchObject({
      id: 1,
      title: 'some title',
      author: 'Art',
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: expect.any(String),
      publicationDate: expect.any(String),
      availableResolutions: ['P144'],
    });

    const getRes = await req.get('/videos/');
    expect(getRes.body).toEqual([
      {
        id: 1,
        title: 'some title',
        author: 'Art',
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: expect.any(String),
        publicationDate: expect.any(String),
        availableResolutions: ['P144'],
      },
    ]);
  });

  it('should not get entity by incorrect id', async () => {
    await req.get('/videos/helloWorld').expect(httpStatutes.BAD_REQUEST_400);
  });
  it('should not get entity by not existent id', async () => {
    await req.get('/videos/111111').expect(httpStatutes.NOT_FOUND_404);
  });
  it('should get entity by id', async () => {
    const res = await req.get('/videos/1').expect(httpStatutes.OK_200);
    expect(res.body).toEqual({
      id: 1,
      title: 'some title',
      author: 'Art',
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: expect.any(String),
      publicationDate: expect.any(String),
      availableResolutions: ['P144'],
    });
  });
  it('should not update entity by incorrect id', async () => {
    await req.put('/videos/helloWorld').expect(httpStatutes.BAD_REQUEST_400);
  });
  it('should not update entity by not existent id', async () => {
    await req.put('/videos/1111111').expect(httpStatutes.NOT_FOUND_404);
  });
  it('should not update entity with correct input data', async () => {
    const putRes = await req
      .put('/videos/1')
      .send({
        title: '',
        author: '',
        availableResolutions: [],
        canBeDownloaded: undefined,
        minAgeRestriction: 0,
        publicationDate: '',
      })
      .expect(httpStatutes.BAD_REQUEST_400);
    expect(putRes.body).toMatchObject({
      errorsMessages: [
        { message: expect.any(String), field: 'title' },
        { message: expect.any(String), field: 'author' },
        { message: expect.any(String), field: 'availableResolutions' },
        { message: expect.any(String), field: 'canBeDownloaded' },
        { message: expect.any(String), field: 'minAgeRestriction' },
        { message: expect.any(String), field: 'publicationDate' },
      ],
    });
    const getRes = await req.get('/videos/1');
    expect(getRes.body).toEqual({
      id: 1,
      title: 'some title',
      author: 'Art',
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: expect.any(String),
      publicationDate: expect.any(String),
      availableResolutions: ['P144'],
    });
  });
});
