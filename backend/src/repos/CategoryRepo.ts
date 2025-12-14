/* eslint-disable max-len */
import { IBaseRepo } from './BaseRepo';
import { ICategory, CategoryModel } from '@src/models/Category';

export interface ICategoryRepo extends IBaseRepo<ICategory> {
  getByName: (name: string) => Promise<ICategory | null>;
}

export class CategoryRepo implements ICategoryRepo {
  private model = CategoryModel;

  public async getAll(): Promise<ICategory[]> {
    return this.model.find({}).exec() as Promise<ICategory[]>;
  }

  public async getById(id: string): Promise<ICategory | null> {
    return this.model.findById(id).exec() as Promise<ICategory | null>;
  }

  public async add(data: Omit<ICategory, '_id' | 'createdAt' | 'updatedAt'>): Promise<ICategory> {
    const newCategory = new this.model(data);
    return newCategory.save() as Promise<ICategory>;
  }

  public async update(id: string, data: Partial<ICategory>): Promise<ICategory | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec() as Promise<ICategory | null>;
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }

  public async getByName(name: string): Promise<ICategory | null> {
    return this.model.findOne({ name }).exec() as Promise<ICategory | null>;
  }
}