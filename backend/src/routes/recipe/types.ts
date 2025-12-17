/* eslint-disable max-len */
import { IRecipe } from '@src/models/Recipe';

export type IBaseRecipeModelInput = Omit<IRecipe,
  '_id' | 'createdAt' | 'updatedAt'
>;

export type ICreateRecipeReqBody =
  Partial<Omit<IBaseRecipeModelInput, 'views' | 'likes'>>
  & Required<Pick<IBaseRecipeModelInput, 'title' | 'category' | 'description'>>;

export type IUpdateRecipeReqBody =
  Partial<Omit<IRecipe, '_id' | 'createdAt' | 'updatedAt' | 'author' | 'views' | 'likes'>>;

export type ICreateRecipeServiceInput = IBaseRecipeModelInput;