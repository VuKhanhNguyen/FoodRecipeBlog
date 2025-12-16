/* eslint-disable max-len */
import { IBaseRepo } from "./BaseRepo";
import { IRecipe, RecipeModel } from "@src/models/Recipe";
import { CategoryModel } from "@src/models/Category";

export interface IRecipeRepo extends IBaseRepo<IRecipe> {
  getByTitle: (title: string) => Promise<IRecipe | null>;
  getByIngredient: (ingredient: string) => Promise<IRecipe[]>;
  getByTag: (tag: string) => Promise<IRecipe[]>;
  getByAuthor: (author: string) => Promise<IRecipe[]>;
  getByCategory: (category: string) => Promise<IRecipe[]>;
  getByDifficulty: (difficulty: string) => Promise<IRecipe[]>;
}

export class RecipeRepo implements IRecipeRepo {
  private model = RecipeModel;

  public async getAll(): Promise<IRecipe[]> {
    return this.model
      .find({})
      .populate("category", "name description image")
      .populate("author", "username email")
      .exec() as Promise<IRecipe[]>;
  }

  public async getById(id: string): Promise<IRecipe | null> {
    return this.model
      .findById(id)
      .populate("category", "name description image")
      .populate("author", "username email")
      .exec() as Promise<IRecipe | null>;
  }

  public async add(
    data: Omit<IRecipe, "_id" | "createdAt" | "updatedAt" | "views" | "likes">
  ): Promise<IRecipe> {
    const newRecipe = new this.model(data);

    return newRecipe.save() as Promise<IRecipe>;
  }

  public async update(
    id: string,
    data: Partial<IRecipe>
  ): Promise<IRecipe | null> {
    return this.model
      .findByIdAndUpdate(id, data, { new: true })
      .populate("category", "name description image")
      .populate("author", "username email")
      .exec() as Promise<IRecipe | null>;
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }

  public async getByTitle(title: string): Promise<IRecipe | null> {
    return this.model.findOne({ title }).exec() as Promise<IRecipe | null>;
  }

  public async getByIngredient(ingredient: string): Promise<IRecipe[]> {
    return this.model.find({ ingredients: ingredient }).exec() as Promise<
      IRecipe[]
    >;
  }

  public async getByTag(tag: string): Promise<IRecipe[]> {
    return this.model.find({ tags: tag }).exec() as Promise<IRecipe[]>;
  }

  public async getByAuthor(author: string): Promise<IRecipe[]> {
    return this.model
      .find({ author })
      .populate("category", "name description image")
      .populate("author", "username email")
      .exec() as Promise<IRecipe[]>;
  }

  public async getByCategory(category: string): Promise<IRecipe[]> {
    const categoryDoc = await CategoryModel.findOne({ name: category }).exec();
    if (!categoryDoc) {
      return []; // Trả về mảng rỗng nếu không tìm thấy category
    }

    return this.model
      .find({ category: categoryDoc._id })
      .populate("category", "name description image")
      .populate("author", "username email")
      .exec() as Promise<IRecipe[]>;
  }

  public async getByDifficulty(difficulty: string): Promise<IRecipe[]> {
    return this.model.find({ difficulty }).exec() as Promise<IRecipe[]>;
  }
}
