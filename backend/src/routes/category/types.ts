/* eslint-disable max-len */
import { ICategory } from '@src/models/Category';

export type ICreateCategoryReqBody = Partial<Omit<ICategory, '_id' | 'createdAt'>> & Required<Pick<Omit<ICategory, '_id' | 'createdAt'>, 'name' | 'slug'>>;
export type IUpdateCategoryReqBody = Partial<Omit<ICategory, '_id' | 'createdAt'>>;