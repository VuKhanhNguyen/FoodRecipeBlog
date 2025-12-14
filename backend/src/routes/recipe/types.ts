/* eslint-disable max-len */
import { IRecipe } from '@src/models/Recipe';

export type ICreateRecipeReqBody = Partial<Omit<IRecipe, '_id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>> & Required<Pick<Omit<IRecipe, '_id' | 'createdAt' | 'updatedAt' | 'views' | 'likes'>, 'title' | 'category' | 'description'>>;
export type IUpdateRecipeReqBody = Partial<Omit<IRecipe, '_id' | 'createdAt' | 'updatedAt' | 'author' | 'views' | 'likes'>>;