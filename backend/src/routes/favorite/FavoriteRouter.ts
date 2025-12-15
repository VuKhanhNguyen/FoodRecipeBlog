/* eslint-disable max-len */
import HTTP_STATUS_CODES from '@src/common/constants/HTTP_STATUS_CODES';
import { RouteError } from '@src/common/util/route-errors';
import FavoriteService from '@src/services/FavoriteService';
import { Router, Request, Response } from 'express';
import logger from 'jet-logger';
import { ICreateFavoriteReqBody } from './types';
import { authenticateToken } from '@src/middleware/auth';
import { Types } from 'mongoose';
import { IRequestWithUser } from '@src/middleware/types';

const favoriteRouter = Router();

favoriteRouter.get('/all', authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = (req as Request & IRequestWithUser).user;

    if (!user) {
      return res.status(HTTP_STATUS_CODES.Unauthorized).json({ error: 'Unauthorized' });
    }

    if (user.role !== 'admin') {
      return res.status(HTTP_STATUS_CODES.Forbidden).json({ error: 'Forbidden' });
    }

    const favorites = await FavoriteService.getAll();
    return res.status(HTTP_STATUS_CODES.Ok).json({ favorites });
  } catch (error) {
    logger.err(error, true);
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({ error: 'Lỗi server khi lấy danh sách yêu thích | 500' });
  }
});


favoriteRouter.get('/my-favorites', authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = (req as Request & IRequestWithUser).user;
    if (!user) {
      return res.status(HTTP_STATUS_CODES.Unauthorized).json({ error: 'Unauthorized' });
    }

    const userId = user.id;

    const favorites = await FavoriteService.getByUserId(userId);
    return res.status(HTTP_STATUS_CODES.Ok).json({ favorites });
  } catch (error) {
    logger.err(error, true);
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({ error: 'Lỗi server khi lấy danh sách yêu thích của bạn | 500' });
  }
});

favoriteRouter.get('/user/:userId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const favorites = await FavoriteService.getByUserId(userId);
    return res.status(HTTP_STATUS_CODES.Ok).json({ favorites });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: 'Lỗi server khi lấy danh sách yêu thích. | 500',
    });
  }
});

favoriteRouter.get('/recipe/:recipeId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.params;
    const favorites = await FavoriteService.getByRecipeId(recipeId);
    return res.status(HTTP_STATUS_CODES.Ok).json({ favorites });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: 'Lỗi server khi lấy danh sách yêu thích. | 500',
    });
  }
});

favoriteRouter.get('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const favorite = await FavoriteService.getOne(id);
    return res.status(HTTP_STATUS_CODES.Ok).json({ favorite });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: 'Lỗi server khi lấy yêu thích. | 500',
    });
  }
});

favoriteRouter.post('/', authenticateToken, async (req: Request<object, object, ICreateFavoriteReqBody>, res: Response) => {
  try {

    const { recipeId } = req.body;

    const user = (req as Request & IRequestWithUser).user;

    if (!user) {
      return res.status(HTTP_STATUS_CODES.Unauthorized).json({ error: 'Unauthorized' });
    }

    const userId: string = user.id;

    const favorite = await FavoriteService.createFavorite({
      userId: new Types.ObjectId(userId),
      recipeId: new Types.ObjectId(recipeId),
    });
    return res.status(HTTP_STATUS_CODES.Created).json({ favorite });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: 'Lỗi server khi tạo yêu thích. | 500',
    });
  }
});

favoriteRouter.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = (req as Request & IRequestWithUser).user;

    if (!user) {
      return res.status(HTTP_STATUS_CODES.Unauthorized).json({ error: 'Unauthorized' });
    }

    const userId: string = user.id;
    const favorite = await FavoriteService.getOne(id);

    if (!favorite) {
      return res.status(HTTP_STATUS_CODES.NotFound).json({ error: 'Không tìm thấy yêu thích' });
    }

    if (favorite.userId.toString() !== userId && user.role !== 'admin') {
      return res.status(HTTP_STATUS_CODES.Forbidden).json({ error: 'Bạn không có quyền xóa yêu thích này' });
    }

    await FavoriteService.deleteFavorite(id);
    return res.status(HTTP_STATUS_CODES.Ok).json({ message: 'Đã xóa yêu thích thành công' });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: 'Lỗi server khi xóa yêu thích. | 500',
    });
  }
});

export default favoriteRouter;