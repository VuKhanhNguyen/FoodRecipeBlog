/* eslint-disable max-len */
import HTTP_STATUS_CODES from "@src/common/constants/HTTP_STATUS_CODES";
import { RouteError } from "@src/common/util/route-errors";
import { IRecipeRepo, RecipeRepo } from "@src/repos/RecipeRepo";
import { IRecipe } from "@src/models/Recipe";
import { CommentService } from "./CommentService";

export const RECIPE_NOT_FOUND_ERR = "Recipe not found";

export class RecipeService {
  private recipeRepo: IRecipeRepo = new RecipeRepo();

  public async getAll(): Promise<IRecipe[]> {
    return this.recipeRepo.getAll();
  }

  public async getOne(id: string): Promise<IRecipe | null> {
    const recipe = await this.recipeRepo.getById(id);
    if (!recipe) {
      throw new RouteError(HTTP_STATUS_CODES.NotFound, RECIPE_NOT_FOUND_ERR);
    }
    return recipe;
  }

  public async getByTitle(title: string): Promise<IRecipe | null> {
    const recipe = await this.recipeRepo.getByTitle(title);
    if (!recipe) {
      throw new RouteError(HTTP_STATUS_CODES.NotFound, RECIPE_NOT_FOUND_ERR);
    }
    return recipe;
  }

  public async getByIngredient(ingredient: string): Promise<IRecipe[]> {
    return this.recipeRepo.getByIngredient(ingredient);
  }

  public async getByTag(tag: string): Promise<IRecipe[]> {
    return this.recipeRepo.getByTag(tag);
  }

  public async getByAuthor(author: string): Promise<IRecipe[]> {
    return this.recipeRepo.getByAuthor(author);
  }

  public async getByCategory(category: string): Promise<IRecipe[]> {
    return this.recipeRepo.getByCategory(category);
  }

  public async getByDifficulty(difficulty: string): Promise<IRecipe[]> {
    return this.recipeRepo.getByDifficulty(difficulty);
  }

  public async createRecipe(
    data: Omit<IRecipe, "_id" | "createdAt" | "updatedAt">
  ): Promise<IRecipe> {
    return this.recipeRepo.add(data);
  }

  public async updateRecipe(
    id: string,
    data: Partial<IRecipe>
  ): Promise<IRecipe | null> {
    const recipe = await this.recipeRepo.update(id, data);
    if (!recipe) {
      throw new RouteError(HTTP_STATUS_CODES.NotFound, RECIPE_NOT_FOUND_ERR);
    }
    return recipe;
  }

  public async deleteRecipe(id: string): Promise<void> {
    const deleted = await this.recipeRepo.delete(id);
    if (!deleted) {
      throw new RouteError(HTTP_STATUS_CODES.NotFound, RECIPE_NOT_FOUND_ERR);
    }
  }

  public async calculateAverageRating(recipeId: string): Promise<number> {
    const commentService = new CommentService();
    const comments = await commentService.getByRecipeId(recipeId);

    // Lọc các comment có rating
    const ratingsOnly = comments
      .map((c) => c.rating)
      .filter((r): r is number => r !== undefined && r !== null && r > 0);

    if (ratingsOnly.length === 0) return 0;

    const sum = ratingsOnly.reduce(
      (acc: number, rating: number) => acc + rating,
      0
    );
    return Math.round((sum / ratingsOnly.length) * 10) / 10; // Làm tròn 1 chữ số thập phân
  }
}

export default new RecipeService();
