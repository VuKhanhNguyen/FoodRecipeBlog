/* eslint-disable max-len */
import HTTP_STATUS_CODES from '@src/common/constants/HTTP_STATUS_CODES';
import { RouteError } from '@src/common/util/route-errors';
import CategoryService from '@src/services/CategoryService';
import { Router, Request, Response } from 'express';
import logger from 'jet-logger';
import { ICreateCategoryReqBody, IUpdateCategoryReqBody } from './types';
import { authenticateToken } from '@src/middleware/auth';
import { IRequestWithUser } from '@src/middleware/types';

const categoryRouter = Router();

categoryRouter.get('/all', async (_req, res) => {
  try {
    const categories = await CategoryService.getAll();
    return res.status(HTTP_STATUS_CODES.Ok).json({ categories });
  } catch (error) {
    logger.err(error, true);
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({ error: 'Lỗi server khi lấy danh sách danh mục | 500' });
  }
});

categoryRouter.get('/name/:name', async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const category = await CategoryService.getByName(name);
    return res.status(HTTP_STATUS_CODES.Ok).json({ category });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({ error: 'Lỗi server khi lấy danh mục theo tên | 500' });
  }
});

categoryRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await CategoryService.getOne(id);
    return res.status(HTTP_STATUS_CODES.Ok).json({ category });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({ error: 'Lỗi server khi lấy danh mục theo ID | 500' });
  }
});

categoryRouter.post('/', authenticateToken, async (req: Request<object, object, ICreateCategoryReqBody>, res: Response) => {
  try {
    const data = req.body;

    const user = (req as Request & IRequestWithUser).user;
    if (!user) {
      return res.status(HTTP_STATUS_CODES.Unauthorized).json({
        error: 'Bạn cần đăng nhập để thực hiện hành động này.',
      });
    }

    if (user.role !== 'admin') {
      return res.status(HTTP_STATUS_CODES.Forbidden).json({ error: 'Chỉ quản trị viên mới có thể tạo danh mục | 403' });
    }

    const newCategory = await CategoryService.createCategory(data);
    return res.status(HTTP_STATUS_CODES.Created).json({ category: newCategory });
  }
  catch (error) {
    logger.err(error, true);
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({ error: 'Lỗi server khi tạo danh mục | 500' });
  }
});

categoryRouter.put('/:id', async (req: Request<{ id: string }, object, IUpdateCategoryReqBody>, res: Response) => {
  try {
    const { id } = req.params;
    const cateData = req.body;

    const user = (req as Request & IRequestWithUser).user;
    if (!user) {
      return res.status(HTTP_STATUS_CODES.Unauthorized).json({
        error: 'Bạn cần đăng nhập để thực hiện hành động này.',
      });
    }

    if (user.role !== 'admin') {
      return res.status(HTTP_STATUS_CODES.Forbidden).json({ error: 'Chỉ quản trị viên mới có thể cập nhật danh mục | 403' });
    }

    const updatedCategory = await CategoryService.updateCategory(id, cateData);
    return res.status(HTTP_STATUS_CODES.Ok).json({ category: updatedCategory });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({ error: 'Lỗi server khi cập nhật danh mục | 500' });
  }
});

categoryRouter.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const user = (req as Request & IRequestWithUser).user;
    if (!user) {
      return res.status(HTTP_STATUS_CODES.Unauthorized).json({
        error: 'Bạn cần đăng nhập để thực hiện hành động này.',
      });
    }

    if (user.role !== 'admin') {
      return res.status(HTTP_STATUS_CODES.Forbidden).json({ error: 'Chỉ quản trị viên mới có thể xóa danh mục | 403' });
    }

    await CategoryService.deleteCategory(id);
    return res.status(HTTP_STATUS_CODES.Ok).json({ message: 'Xóa danh mục thành công.' });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({ error: 'Lỗi server khi xóa danh mục | 500' });
  }
});

export default categoryRouter;