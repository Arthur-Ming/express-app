import { req } from './test-helpers';
import routes from '../src/common/routes';
import { httpStatutes } from '../src/common/httpStatutes';
import { BlogOutputData } from '../src/resources/blogs/interfaces';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

let createdBlog: null | BlogOutputData = null;
const updateBlogBody = {
  name: 'updated item',
  description: 'updated description',
  websiteUrl: 'https://developer.mozilla.org',
};

describe('/blogs', () => {
  beforeAll(async () => {
    await req.delete('/testing/all-data');
    createdBlog = null;
  });
  it('should get empty array', async () => {
    const res = await req.get(routes.blogs).expect(httpStatutes.OK_200);
    expect(res.body).toEqual([]);
  });
  it('should not create entity for unauthorized  user', async () => {
    await req.post(routes.blogs).send({}).expect(httpStatutes.UNAUTHORIZED_401);
  });
  it('should not create entity with incorrect input data', async () => {
    const postRes = await req
      .post(routes.blogs)
      .auth('admin', 'qwerty')
      .send({
        name: '',
        description: '',
        websiteUrl: '',
      })
      .expect(httpStatutes.BAD_REQUEST_400);
    expect(postRes.body).toMatchObject({
      errorsMessages: [
        { message: expect.any(String), field: 'name' },
        { message: expect.any(String), field: 'description' },
        { message: expect.any(String), field: 'websiteUrl' },
      ],
    });
    const getRes = await req.get(routes.blogs);
    expect(getRes.body).toEqual([]);
  });
  it('should create entity with correct input data', async function () {
    const postRes = await req
      .post(routes.blogs)
      .auth('admin', 'qwerty')
      .send({
        name: 'item',
        description: 'some description',
        websiteUrl: 'https://www.youtube.com/',
      })
      .expect(httpStatutes.CREATED_201);

    expect(postRes.body).toMatchObject({
      id: expect.any(String),
      name: 'item',
      description: 'some description',
      websiteUrl: 'https://www.youtube.com/',
      createdAt: expect.any(String),
      isMembership: false,
    });
    createdBlog = postRes.body;
    const getRes = await req.get(routes.blogs);
    expect(getRes.body).toEqual([createdBlog]);
  });
  it('should not get entity by incorrect id', async () => {
    await req.get(`${routes.blogs}/helloWorld`).expect(httpStatutes.NOT_FOUND_404);
  });
  it('should get entity by correct id', async () => {
    if (createdBlog) {
      const getRes = await req.get(`${routes.blogs}/${createdBlog.id}`).expect(httpStatutes.OK_200);
      expect(getRes.body).toMatchObject(createdBlog);
    }
  });
  it('should not update entity for unauthorized  user', async () => {
    await req.put(routes.blogById).send({}).expect(httpStatutes.UNAUTHORIZED_401);
  });
  it('should not update entity by incorrect id', async () => {
    await req
      .put(`${routes.blogs}/helloWorld`)
      .auth('admin', 'qwerty')
      .send({})
      .expect(httpStatutes.NOT_FOUND_404);
  });
  it('should not update entity with incorrect input data', async () => {
    if (createdBlog) {
      const putRes = await req
        .put(`${routes.blogs}/${createdBlog.id}`)
        .auth('admin', 'qwerty')
        .send({
          name: '',
          description: '',
          websiteUrl: '',
        })
        .expect(httpStatutes.BAD_REQUEST_400);
      expect(putRes.body).toMatchObject({
        errorsMessages: [
          { message: expect.any(String), field: 'name' },
          { message: expect.any(String), field: 'description' },
          { message: expect.any(String), field: 'websiteUrl' },
        ],
      });
      const getRes = await req.get(`${routes.blogs}/${createdBlog.id}`);
      expect(getRes.body).toEqual(createdBlog);
    }
  });
  it('should update entity with correct input data', async () => {
    if (createdBlog) {
      await req
        .put(`${routes.blogs}/${createdBlog.id}`)
        .auth('admin', 'qwerty')
        .send(updateBlogBody)
        .expect(httpStatutes.OK_NO_CONTENT_204);

      const getRes = await req.get(`${routes.blogs}/${createdBlog.id}`);
      expect(getRes.body).toEqual({ ...createdBlog, ...updateBlogBody });
    }
  });
  it('should not delete entity for unauthorized user', async () => {
    await req.delete(routes.blogById).send({}).expect(httpStatutes.UNAUTHORIZED_401);
  });
  it('should not delete entity by incorrect id', async () => {
    await req
      .delete(`${routes.blogs}/helloWorld`)
      .auth('admin', 'qwerty')
      .expect(httpStatutes.NOT_FOUND_404);
  });
  it('should delete entity by correct id', async () => {
    if (createdBlog) {
      await req
        .delete(`${routes.blogs}/${createdBlog.id}`)
        .auth('admin', 'qwerty')
        .expect(httpStatutes.OK_NO_CONTENT_204);

      await req.get(`${routes.blogs}/${createdBlog.id}`).expect(httpStatutes.NOT_FOUND_404);
    }
  });
});

//
// const postRes = await req
//   .auth('amin', 'qwerty')
//   .post(routes.blogs)
//   .send({})
//   .expect(httpStatutes.UNAUTHORIZED_401);

//
// describe('/videos', () => {
//   beforeAll(async () => {
//     await req.delete('/testing/all-data');
//   });
//   it('should get empty array', async () => {
//     const res = await req.get(routes.videos).expect(200);
//     expect(res.body).toEqual([]);
//   });
//   it('should not create entity with incorrect input data', async function () {
//     const postRes = await req
//       .post('/videos')
//       .send({
//         title: '',
//         author: '',
//         availableResolutions: [],
//       })
//       .expect(httpStatutes.BAD_REQUEST_400);
//     expect(postRes.body).toMatchObject({
//       errorsMessages: [
//         { message: expect.any(String), field: 'title' },
//         { message: expect.any(String), field: 'author' },
//         { message: expect.any(String), field: 'availableResolutions' },
//       ],
//     });
//     const getRes = await req.get('/videos/');
//     expect(getRes.body).toEqual([]);
//   });
//   it('should not create entity with correct input data', async function () {
//     const postRes = await req
//       .post('/videos')
//       .send({
//         title: 'some title',
//         author: 'Art',
//         availableResolutions: ['P144'],
//       })
//       .expect(httpStatutes.CREATED_201);
//
//     expect(postRes.body).toMatchObject({
//       id: 1,
//       title: 'some title',
//       author: 'Art',
//       canBeDownloaded: false,
//       minAgeRestriction: null,
//       createdAt: expect.any(String),
//       publicationDate: expect.any(String),
//       availableResolutions: ['P144'],
//     });
//
//     const getRes = await req.get('/videos/');
//     expect(getRes.body).toEqual([
//       {
//         id: 1,
//         title: 'some title',
//         author: 'Art',
//         canBeDownloaded: false,
//         minAgeRestriction: null,
//         createdAt: expect.any(String),
//         publicationDate: expect.any(String),
//         availableResolutions: ['P144'],
//       },
//     ]);
//   });
//
//   it('should not get entity by incorrect id', async () => {
//     await req.get('/videos/helloWorld').expect(httpStatutes.BAD_REQUEST_400);
//   });
//   it('should not get entity by not existent id', async () => {
//     await req.get('/videos/111111').expect(httpStatutes.NOT_FOUND_404);
//   });
//   it('should get entity by id', async () => {
//     const res = await req.get('/videos/1').expect(httpStatutes.OK_200);
//     expect(res.body).toEqual({
//       id: 1,
//       title: 'some title',
//       author: 'Art',
//       canBeDownloaded: false,
//       minAgeRestriction: null,
//       createdAt: expect.any(String),
//       publicationDate: expect.any(String),
//       availableResolutions: ['P144'],
//     });
//   });
//   it('should not update entity by incorrect id', async () => {
//     await req.put('/videos/helloWorld').expect(httpStatutes.BAD_REQUEST_400);
//   });
//   it('should not update entity by not existent id', async () => {
//     await req.put('/videos/1111111').expect(httpStatutes.NOT_FOUND_404);
//   });
//   it('should not update entity with correct input data', async () => {
//     const putRes = await req
//       .put('/videos/1')
//       .send({
//         title: '',
//         author: '',
//         availableResolutions: [],
//         canBeDownloaded: undefined,
//         minAgeRestriction: 0,
//         publicationDate: '',
//       })
//       .expect(httpStatutes.BAD_REQUEST_400);
//     expect(putRes.body).toMatchObject({
//       errorsMessages: [
//         { message: expect.any(String), field: 'title' },
//         { message: expect.any(String), field: 'author' },
//         { message: expect.any(String), field: 'availableResolutions' },
//         { message: expect.any(String), field: 'canBeDownloaded' },
//         { message: expect.any(String), field: 'minAgeRestriction' },
//         { message: expect.any(String), field: 'publicationDate' },
//       ],
//     });
//     const getRes = await req.get('/videos/1');
//     expect(getRes.body).toEqual({
//       id: 1,
//       title: 'some title',
//       author: 'Art',
//       canBeDownloaded: false,
//       minAgeRestriction: null,
//       createdAt: expect.any(String),
//       publicationDate: expect.any(String),
//       availableResolutions: ['P144'],
//     });
//   });
// });
