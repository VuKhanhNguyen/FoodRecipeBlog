/* eslint-disable max-len */
import HTTP_STATUS_CODES from "@src/common/constants/HTTP_STATUS_CODES";
import { RouteError } from "@src/common/util/route-errors";
import RecipeService from "@src/services/RecipeService";
import { Router, Request, Response } from "express";
import logger from "jet-logger";
import { ICreateRecipeReqBody, IUpdateRecipeReqBody } from "./types";
import { authenticateToken } from "@src/middleware/auth";
import { IRequestWithUser } from "@src/middleware/types";
import { Types, isValidObjectId } from "mongoose";
import { CategoryModel } from "@src/models/Category";

const recipeRouter = Router();

// Validation function for nutrition info
const validateNutritionInfo = (nutritionInfo?: any): boolean => {
  if (!nutritionInfo) return true;

  const { calories, protein, carbs, fat, fiber } = nutritionInfo;

  if (
    calories !== undefined &&
    (typeof calories !== "number" || calories < 0)
  ) {
    return false;
  }
  if (protein !== undefined && (typeof protein !== "number" || protein < 0)) {
    return false;
  }
  if (carbs !== undefined && (typeof carbs !== "number" || carbs < 0)) {
    return false;
  }
  if (fat !== undefined && (typeof fat !== "number" || fat < 0)) {
    return false;
  }
  if (fiber !== undefined && (typeof fiber !== "number" || fiber < 0)) {
    return false;
  }

  return true;
};

// Helper: resolve category input (id string, object with _id, or name) to ObjectId
const resolveCategoryId = async (
  category: unknown
): Promise<Types.ObjectId | null> => {
  try {
    if (category instanceof Types.ObjectId) return category;

    if (
      category &&
      typeof category === "object" &&
      (category as any)._id &&
      isValidObjectId((category as any)._id)
    ) {
      return new Types.ObjectId((category as any)._id);
    }

    if (typeof category === "string") {
      if (isValidObjectId(category)) {
        return new Types.ObjectId(category);
      }
      const found = await CategoryModel.findOne({ name: category }).exec();
      if (found?._id) return found._id as Types.ObjectId;
    }

    return null;
  } catch {
    return null;
  }
};

recipeRouter.get("/all", async (_: Request, res: Response) => {
  try {
    const recipes = await RecipeService.getAll();
    return res.status(HTTP_STATUS_CODES.Ok).json({ recipes });
  } catch (error) {
    logger.err(error, true);
    return res
      .status(HTTP_STATUS_CODES.InternalServerError)
      .json({ error: "Lỗi server khi lấy danh sách công thức | 500" });
  }
});

recipeRouter.get("/title/:title", async (req: Request, res: Response) => {
  try {
    const { title } = req.params;
    const recipe = await RecipeService.getByTitle(title);
    return res.status(HTTP_STATUS_CODES.Ok).json({ recipe });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: "Lỗi server khi lấy thông tin công thức. | 500",
    });
  }
});

recipeRouter.get(
  "/ingredient/:ingredient",
  async (req: Request, res: Response) => {
    try {
      const { ingredient } = req.params;
      const recipes = await RecipeService.getByIngredient(ingredient);
      return res.status(HTTP_STATUS_CODES.Ok).json({ recipes });
    } catch (error) {
      logger.err(error, true);
      if (error instanceof RouteError) {
        return res.status(error.status).json({ error: error.message });
      }
      return res.status(HTTP_STATUS_CODES.InternalServerError).json({
        error: "Lỗi server khi lấy thông tin công thức. | 500",
      });
    }
  }
);

recipeRouter.get("/tag/:tag", async (req: Request, res: Response) => {
  try {
    const { tag } = req.params;
    const recipes = await RecipeService.getByTag(tag);
    return res.status(HTTP_STATUS_CODES.Ok).json({ recipes });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: "Lỗi server khi lấy thông tin công thức. | 500",
    });
  }
});

recipeRouter.get("/author/:author", async (req: Request, res: Response) => {
  try {
    const { author } = req.params;
    const recipes = await RecipeService.getByAuthor(author);
    return res.status(HTTP_STATUS_CODES.Ok).json({ recipes });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: "Lỗi server khi lấy thông tin công thức. | 500",
    });
  }
});

recipeRouter.get("/category/:category", async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const recipes = await RecipeService.getByCategory(category);
    return res.status(HTTP_STATUS_CODES.Ok).json({ recipes });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: "Lỗi server khi lấy thông tin công thức. | 500",
    });
  }
});

recipeRouter.get(
  "/difficulty/:difficulty",
  async (req: Request, res: Response) => {
    try {
      const { difficulty } = req.params;
      const recipes = await RecipeService.getByDifficulty(difficulty);
      return res.status(HTTP_STATUS_CODES.Ok).json({ recipes });
    } catch (error) {
      logger.err(error, true);
      if (error instanceof RouteError) {
        return res.status(error.status).json({ error: error.message });
      }
      return res.status(HTTP_STATUS_CODES.InternalServerError).json({
        error: "Lỗi server khi lấy thông tin công thức. | 500",
      });
    }
  }
);

recipeRouter.get("/:id/comments", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Import CommentService dynamically to avoid circular dependency
    const CommentService = (await import("@src/services/CommentService"))
      .default;
    const comments = await CommentService.getByRecipeId(id);
    return res.status(HTTP_STATUS_CODES.Ok).json({ comments });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: "Lỗi server khi lấy bình luận. | 500",
    });
  }
});

recipeRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = await RecipeService.getOne(id);

    if (!recipe) {
      return res.status(HTTP_STATUS_CODES.NotFound).json({
        error: "Công thức không tìm thấy. | 404",
      });
    }

    // Tính average rating
    const averageRating = await RecipeService.calculateAverageRating(id);

    // Convert to plain object
    const recipeData = JSON.parse(JSON.stringify(recipe));

    return res.status(HTTP_STATUS_CODES.Ok).json({
      recipe: {
        ...recipeData,
        rating: averageRating,
      },
    });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: "Lỗi server khi lấy thông tin công thức. | 500",
    });
  }
});

recipeRouter.post(
  "/",
  authenticateToken,
  async (req: Request<object, object, ICreateRecipeReqBody>, res: Response) => {
    try {
      const recipeData = req.body;

      // Validate nutrition info
      if (
        recipeData.nutritionInfo &&
        !validateNutritionInfo(recipeData.nutritionInfo)
      ) {
        return res.status(HTTP_STATUS_CODES.BadRequest).json({
          error:
            "Thông tin dinh dưỡng không hợp lệ. Các giá trị phải là số dương.",
        });
      }

      const user = (req as Request & IRequestWithUser).user;

      if (!user) {
        return res
          .status(HTTP_STATUS_CODES.Unauthorized)
          .json({ error: "Unauthorized" });
      }

      const userId = user.id;

      // Normalize category to ObjectId (accept id, object, or name)
      const categoryId = await resolveCategoryId(recipeData.category);
      if (!categoryId) {
        return res.status(HTTP_STATUS_CODES.BadRequest).json({
          error:
            "Danh mục không hợp lệ. Vui lòng chọn danh mục hợp lệ (ID hoặc tên).",
        });
      }

      // Sanitize numerics to satisfy schema constraints
      const sanitizeNumber = (val: any, min: number, fallback: number) => {
        const num = typeof val === "number" ? val : Number(val);
        if (Number.isFinite(num) && num >= min) return num;
        return fallback;
      };

      const payload = {
        ...recipeData,
        category: categoryId,
        author: new Types.ObjectId(userId),
        prepTime: sanitizeNumber((recipeData as any).prepTime, 0, 0),
        cookTime: sanitizeNumber((recipeData as any).cookTime, 0, 0),
        servings: sanitizeNumber((recipeData as any).servings, 1, 1),
      } as ICreateRecipeReqBody as any;

      const newRecipe = await RecipeService.createRecipe(payload as any);

      return res.status(HTTP_STATUS_CODES.Created).json({ recipe: newRecipe });
    } catch (error) {
      logger.err(error, true);
      return res
        .status(HTTP_STATUS_CODES.InternalServerError)
        .json({ error: "Lỗi server khi tạo blog | 500" });
    }
  }
);

recipeRouter.put(
  "/:id",
  authenticateToken,
  async (
    req: Request<{ id: string }, object, IUpdateRecipeReqBody>,
    res: Response
  ) => {
    try {
      const { id } = req.params;
      const recipeData = req.body;

      // Validate nutrition info
      if (
        recipeData.nutritionInfo &&
        !validateNutritionInfo(recipeData.nutritionInfo)
      ) {
        return res.status(HTTP_STATUS_CODES.BadRequest).json({
          error:
            "Thông tin dinh dưỡng không hợp lệ. Các giá trị phải là số dương.",
        });
      }

      const user = (req as Request & IRequestWithUser).user;
      if (!user) {
        return res.status(HTTP_STATUS_CODES.Unauthorized).json({
          error: "Bạn cần đăng nhập để thực hiện hành động này.",
        });
      }
      const userId: string = user.id;

      const currentRecipe = await RecipeService.getOne(id);

      // Safely get authorId, whether it's populated or just an ID
      const author = currentRecipe?.author as any;
      const authorId = author?._id ? author._id.toString() : author?.toString();

      if (!currentRecipe || authorId !== userId) {
        return res.status(HTTP_STATUS_CODES.Forbidden).json({
          error: "Bạn không có quyền cập nhật công thức này | 403",
        });
      }

      if (Object.keys(recipeData).length === 0) {
        return res
          .status(HTTP_STATUS_CODES.BadRequest)
          .json({ error: "Dữ liệu cập nhật không được để trống | 400" });
      }

      // Normalize category to ObjectId if provided
      let normalizedData:
        | IUpdateRecipeReqBody
        | (IUpdateRecipeReqBody & { category: Types.ObjectId }) = recipeData;
      if (recipeData.category !== undefined) {
        const categoryId = await resolveCategoryId(recipeData.category as any);
        if (!categoryId) {
          return res.status(HTTP_STATUS_CODES.BadRequest).json({
            error:
              "Danh mục không hợp lệ. Vui lòng chọn danh mục hợp lệ (ID hoặc tên).",
          });
        }
        normalizedData = { ...recipeData, category: categoryId } as any;
      }

      // Sanitize numeric fields if provided to satisfy schema
      const sanitizeNumber = (val: any, min: number) => {
        if (val === undefined) return undefined;
        const num = typeof val === "number" ? val : Number(val);
        if (!Number.isFinite(num)) return undefined;
        return num < min ? min : num;
      };

      normalizedData = {
        ...normalizedData,
        prepTime: sanitizeNumber((normalizedData as any).prepTime, 0) as any,
        cookTime: sanitizeNumber((normalizedData as any).cookTime, 0) as any,
        servings: sanitizeNumber((normalizedData as any).servings, 1) as any,
      } as any;

      const updatedRecipe = await RecipeService.updateRecipe(
        id,
        normalizedData as any
      );
      return res.status(HTTP_STATUS_CODES.Ok).json({
        message: "Cập nhật công thức thành công | 200",
        recipe: updatedRecipe,
      });
    } catch (error) {
      logger.err(error, true);

      if (error instanceof RouteError) {
        return res.status(error.status).json({ error: error.message });
      }
      return res.status(HTTP_STATUS_CODES.InternalServerError).json({
        error: "Lỗi server khi cập nhật công thức | 500",
      });
    }
  }
);

recipeRouter.delete(
  "/:id",
  authenticateToken,
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;

      const user = (req as Request & IRequestWithUser).user;
      if (!user) {
        return res.status(HTTP_STATUS_CODES.Unauthorized).json({
          error: "Bạn cần đăng nhập để thực hiện hành động này.",
        });
      }
      const userId: string = user.id;

      const currentRecipe = await RecipeService.getOne(id);

      const author = currentRecipe?.author as any;
      const authorId = author?._id ? author._id.toString() : author?.toString();

      if (authorId !== userId) {
        return res.status(HTTP_STATUS_CODES.Forbidden).json({
          error: "Bạn không có quyền xóa công thức này | 403",
        });
      }

      await RecipeService.deleteRecipe(id);
      return res.status(HTTP_STATUS_CODES.Ok).json({
        message: "Xóa công thức thành công | 200",
      });
    } catch (error) {
      logger.err(error, true);

      if (error instanceof RouteError) {
        return res.status(error.status).json({ error: error.message });
      }
      return res.status(HTTP_STATUS_CODES.InternalServerError).json({
        error: "Lỗi server khi xóa công thức | 500",
      });
    }
  }
);

export default recipeRouter;
