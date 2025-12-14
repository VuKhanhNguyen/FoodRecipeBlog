import { IFavorite } from '@src/models/Favorite';

export type ICreateFavoriteReqBody = Omit<IFavorite,
  '_id' | 'createdAt'
>;

