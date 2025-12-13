/* eslint-disable max-len */
import { IUser } from '@src/models/User';

export type IUpdateUserReqBody = Partial<Omit<IUser, '_id' | 'createdAt' | 'updatedAt' | 'email'>>;
