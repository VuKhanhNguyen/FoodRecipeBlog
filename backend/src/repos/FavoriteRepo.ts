/* eslint-disable max-len */
import { IBaseRepo } from './BaseRepo';
import { IFavorite, FavoriteModel } from '@src/models/Favorite';

export interface IFavoriteRepo extends IBaseRepo<IFavorite> {
  getByUserId: (userId: string) => Promise<IFavorite[]>;
  getByRecipeId: (recipeId: string) => Promise<IFavorite[]>;
}

export class FavoriteRepo implements IFavoriteRepo {
  private model = FavoriteModel;

  public async getAll(): Promise<IFavorite[]> {
    return this.model.find({}).exec() as Promise<IFavorite[]>;
  }

  public async getById(id: string): Promise<IFavorite | null> {
    return this.model.findById(id).exec() as Promise<IFavorite | null>;
  }

  public async add(data: Omit<IFavorite, '_id' | 'createdAt'>): Promise<IFavorite> {
    const newFavorite = new this.model(data);
    return newFavorite.save() as Promise<IFavorite>;
  }

  public async update(id: string, data: Partial<IFavorite>): Promise<IFavorite | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec() as Promise<IFavorite | null>;
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }

  public async getByUserId(userId: string): Promise<IFavorite[]> {
    return this.model.find({ userId }).exec() as Promise<IFavorite[]>;
  }

  public async getByRecipeId(recipeId: string): Promise<IFavorite[]> {
    return this.model.find({ recipeId }).exec() as Promise<IFavorite[]>;
  }
}

