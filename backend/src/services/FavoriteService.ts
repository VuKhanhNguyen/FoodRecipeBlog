/* eslint-disable max-len */
import HTTP_STATUS_CODES from '@src/common/constants/HTTP_STATUS_CODES';
import { RouteError } from '@src/common/util/route-errors';
import { IFavoriteRepo, FavoriteRepo } from '@src/repos/FavoriteRepo';
import { IFavorite } from '@src/models/Favorite';

export const FAVORITE_NOT_FOUND_ERR = 'Favorite not found';

export class FavoriteService {
  private favoriteRepo: IFavoriteRepo = new FavoriteRepo();

  public async getAll(): Promise<IFavorite[]> {
    return this.favoriteRepo.getAll();
  }

  public async getOne(id: string): Promise<IFavorite | null> {
    const favorite = await this.favoriteRepo.getById(id);
    if (!favorite) {
      throw new RouteError(
        HTTP_STATUS_CODES.NotFound,
        FAVORITE_NOT_FOUND_ERR,
      );
    }
    return favorite;
  }

  public async getByUserId(userId: string): Promise<IFavorite[]> {
    return this.favoriteRepo.getByUserId(userId);
  }

  public async getByRecipeId(recipeId: string): Promise<IFavorite[]> {
    return this.favoriteRepo.getByRecipeId(recipeId);
  }

  public async createFavorite(favoriteData: Omit<IFavorite, '_id' | 'createdAt'>): Promise<IFavorite> {
    return this.favoriteRepo.add(favoriteData);
  }

  // public async updateFavorite(id: string, favoriteData: Partial<IFavorite>): Promise<IFavorite | null> {
  //   const favorite = await this.favoriteRepo.getById(id);
  //   if (!favorite) {
  //     throw new RouteError(
  //       HTTP_STATUS_CODES.NotFound,
  //       FAVORITE_NOT_FOUND_ERR,
  //     );
  //   }
  //   return this.favoriteRepo.update(id, favoriteData);
  // }

  public async deleteFavorite(id: string): Promise<void> {
    const favorite = await this.favoriteRepo.getById(id);
    if (!favorite) {
      throw new RouteError(
        HTTP_STATUS_CODES.NotFound,
        FAVORITE_NOT_FOUND_ERR,
      );
    }
    await this.favoriteRepo.delete(id);
  }
}

export default new FavoriteService();