/* eslint-disable max-len */
import HTTP_STATUS_CODES from "@src/common/constants/HTTP_STATUS_CODES";
import { RouteError } from "@src/common/util/route-errors";
import RecipeService from "@src/services/RecipeService";
import { Router, Request, Response } from "express";
import logger from "jet-logger";
import { ICreateRecipeReqBody, IUpdateRecipeReqBody } from "./types";
import { authenticateToken } from "@src/middleware/auth";
import { IRequestWithUser } from "@src/middleware/types";
import { Types } from "mongoose";

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

      const newRecipe = await RecipeService.createRecipe({
        ...recipeData,
        author: new Types.ObjectId(userId),
      });

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

      const updatedRecipe = await RecipeService.updateRecipe(id, recipeData);
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
