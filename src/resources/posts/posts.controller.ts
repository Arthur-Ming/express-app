// import { Request, Response } from 'express';
// import { postsRepository } from './posts.repository';
//
// export const getPosts = (req: Request, res: Response) => {
//   res.status(200).json(postsRepository.find());
// };
//
// export const getPostById = (req: Request, res: Response) => {
//   const foundPost = postsRepository.findById(req.params.id);
//   if (!foundPost) {
//     res.sendStatus(404);
//     return;
//   }
//   res.status(200).json(foundPost);
// };
//
// export const addPost = (req: Request, res: Response) => {
//   const newPost = postsRepository.create(req.body);
//
//   const foundPost = postsRepository.findById(newPost.id);
//   if (!foundPost) {
//     res.sendStatus(404);
//     return;
//   }
//   res.status(201).json(foundPost);
// };
//
// export const updatePost = (req: Request, res: Response) => {
//   if (!postsRepository.update(req.params.id, req.body)) {
//     res.sendStatus(404);
//     return;
//   }
//   res.sendStatus(204);
// };
//
// export const deletePost = (req: Request, res: Response) => {
//   if (!postsRepository.remove(req.params.id)) {
//     res.sendStatus(404);
//     return;
//   }
//   res.sendStatus(204);
// };
