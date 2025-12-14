/* eslint-disable max-len */
import HTTP_STATUS_CODES from '@src/common/constants/HTTP_STATUS_CODES';
import { RouteError } from '@src/common/util/route-errors';
import { IRecipe } from '@src/models/Recipe';
import RecipeService from '@src/services/RecipeService';
import { Router, Request, Response } from 'express';
import logger from 'jet-logger';

const recipeRouter = Router();

recipeRouter.get('/all', async (_: Request, res: Response) => {
  try {
    const recipes = await RecipeService.getAll();
    return res.status(HTTP_STATUS_CODES.Ok).json({ recipes });
  } catch (error) {
    logger.err(error, true);
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({ error: 'Lỗi server khi lấy danh sách công thức | 500' });
  }
});

recipeRouter.get('/title/:title', async (req: Request, res: Response) => {
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
      error: 'Lỗi server khi lấy thông tin công thức. | 500',
    });
  }
});

recipeRouter.get('/ingredient/:ingredient', async (req: Request, res: Response) => {
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
      error: 'Lỗi server khi lấy thông tin công thức. | 500',
    });
  }
});

recipeRouter.get('/tag/:tag', async (req: Request, res: Response) => {
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
      error: 'Lỗi server khi lấy thông tin công thức. | 500',
    });
  }
});

recipeRouter.get('/author/:author', async (req: Request, res: Response) => {
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
      error: 'Lỗi server khi lấy thông tin công thức. | 500',
    });
  }
});

recipeRouter.get('/category/:category', async (req: Request, res: Response) => {
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
      error: 'Lỗi server khi lấy thông tin công thức. | 500',
    });
  }
});

recipeRouter.get('/difficulty/:difficulty', async (req: Request, res: Response) => {
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
      error: 'Lỗi server khi lấy thông tin công thức. | 500',
    });
  }
});

recipeRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = await RecipeService.getOne(id);
    return res.status(HTTP_STATUS_CODES.Ok).json({ recipe });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: 'Lỗi server khi lấy thông tin công thức. | 500',
    });
  }
});

recipeRouter.post('/', async (req: Request<object, object, Omit<IRecipe, '_id' | 'createdAt' | 'updatedAt'>>, res: Response) => {
  try {
    const recipeData = req.body;
    const newRecipe = await RecipeService.createRecipe(recipeData);
    return res.status(HTTP_STATUS_CODES.Created).json({ recipe: newRecipe });
  } catch (error) {
    logger.err(error, true);
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({ error: 'Lỗi server khi tạo blog | 500' });
  }
});

recipeRouter.put('/:id', async (req: Request<{ id: string }, object, Partial<IRecipe>>, res: Response) => {
  try {
    const { id } = req.params;
    const recipeData = req.body;

    if (Object.keys(recipeData).length === 0) {
      return res.status(HTTP_STATUS_CODES.BadRequest).json({ error: 'Dữ liệu cập nhật không được để trống | 400' });
    }

    const updatedRecipe = await RecipeService.updateRecipe(id, recipeData);
    return res.status(HTTP_STATUS_CODES.Ok).json({
      message: 'Cập nhật công thức thành công | 200',
      recipe: updatedRecipe,
    });
  } catch (error) {
    logger.err(error, true);

    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: 'Lỗi server khi cập nhật công thức | 500',
    });
  }
});

recipeRouter.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    await RecipeService.deleteRecipe(id);
    return res.status(HTTP_STATUS_CODES.Ok).json({
      message: 'Xóa công thức thành công | 200',
    });
  } catch (error) {
    logger.err(error, true);

    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: 'Lỗi server khi xóa công thức | 500',
    });
  }
});

export default recipeRouter;