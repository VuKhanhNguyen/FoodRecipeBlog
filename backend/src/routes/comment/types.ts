import { IComment } from '@src/models/Comment';

export type IBaseCommentModelInput = Omit<IComment,
  '_id' | 'createdAt' | 'updatedAt'
>;

export type ICreateCommentReqBody = Omit<IComment,
  '_id' | 'createdAt' | 'updatedAt'
>;

export type IUpdateCommentReqBody = Omit<IComment,
  '_id' | 'createdAt' | 'updatedAt'
>;
