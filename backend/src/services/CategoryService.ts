/* eslint-disable max-len */
import HTTP_STATUS_CODES from '@src/common/constants/HTTP_STATUS_CODES';
import { RouteError } from '@src/common/util/route-errors';
import { ICategoryRepo, CategoryRepo } from '@src/repos/CategoryRepo';
import { ICategory } from '@src/models/Category';

export const CATEGORY_NOT_FOUND_ERR = 'Category not found';

export class CategoryService {
  private categoryRepo: ICategoryRepo = new CategoryRepo();

  public async getAll(): Promise<ICategory[]> {
    return this.categoryRepo.getAll();
  }

  public async getOne(id: string): Promise<ICategory | null> {
    const category = await this.categoryRepo.getById(id);
    if (!category) {
      throw new RouteError(
        HTTP_STATUS_CODES.NotFound,
        CATEGORY_NOT_FOUND_ERR,
      );
    }
    return category;
  }

  public async getByName(name: string): Promise<ICategory | null> {
    const category = await this.categoryRepo.getByName(name);
    if (!category) {
      throw new RouteError(
        HTTP_STATUS_CODES.NotFound,
        CATEGORY_NOT_FOUND_ERR,
      );
    }
    return category;
  }

  public async createCategory(data: Omit<ICategory, '_id' | 'createdAt' | 'updatedAt'>): Promise<ICategory> {
    return this.categoryRepo.add(data);
  }

  public async updateCategory(id: string, data: Partial<ICategory>): Promise<ICategory | null> {
    const updatedCategory = await this.categoryRepo.update(id, data);
    if (!updatedCategory) {
      throw new RouteError(
        HTTP_STATUS_CODES.NotFound,
        CATEGORY_NOT_FOUND_ERR,
      );
    }
    return updatedCategory;
  }

  public async deleteCategory(id: string): Promise<void> {
    const deleted = await this.categoryRepo.delete(id);
    if (!deleted) {
      throw new RouteError(
        HTTP_STATUS_CODES.NotFound,
        CATEGORY_NOT_FOUND_ERR,
      );
    }
  }
}

export default new CategoryService();