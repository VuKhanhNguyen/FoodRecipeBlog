/* eslint-disable max-len */
import { Router, Request, Response } from 'express';
import { RouteError } from '@src/common/util/route-errors';
import UserService from '@src/services/UserService';
import { IUpdateUserReqBody } from './types';
import logger from 'jet-logger';
import HTTP_STATUS_CODES from '@src/common/constants/HTTP_STATUS_CODES';


/******************************************************************************
                                Constants
******************************************************************************/
const userRouter = Router();

/******************************************************************************
                                Functions
******************************************************************************/

userRouter.get('/all', async (_: Request, res: Response) => {
  try {
    const users = await UserService.getAll();
    return res.status(HTTP_STATUS_CODES.Ok).json({ users });
  } catch (error) {
    logger.err(error, true);
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({ error: 'Lỗi server khi lấy danh sách người dùng | 500' });
  }
});

userRouter.get('/username/:username', async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await UserService.getOneByUsername(username);

    return res.status(HTTP_STATUS_CODES.Ok).json({ user });
  } catch (error) {
    logger.err(error, true);

    if (error instanceof RouteError) {
      return res.status(HTTP_STATUS_CODES.InternalServerError).json({
        error: 'Lỗi server khi lấy thông tin người dùng. | 500',
      });
    }
  }
});

userRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await UserService.getOne(id);

    return res.status(HTTP_STATUS_CODES.Ok).json({ user });
  } catch (error) {
    logger.err(error, true);

    if (error instanceof RouteError) {
      return res.status(HTTP_STATUS_CODES.InternalServerError).json({
        error: 'Lỗi server khi lấy thông tin người dùng. | 500',
      });
    }
  }
});

userRouter.put('/:id', async (req: Request<{ id: string }, object, IUpdateUserReqBody>, res: Response) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    // Kiểm tra body có dữ liệu không
    if (Object.keys(userData).length === 0) {
      return res.status(HTTP_STATUS_CODES.BadRequest).json({
        error: 'Không có dữ liệu cập nhật.',
      });
    }

    // Gọi Service để cập nhật
    const updatedUser = await UserService.updateOne(id, userData);

    return res.status(HTTP_STATUS_CODES.Ok).json({
      message: 'Cập nhật người dùng thành công.',
      user: updatedUser,
    });
  } catch (error) {
    logger.err(error, true);

    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: 'Lỗi server khi cập nhật người dùng. | 500',
    });
  }
});


userRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Gọi Service để xóa
    await UserService.delete(id);

    return res.status(HTTP_STATUS_CODES.NoContent).end(); // 204 No Content
  } catch (error) {
    logger.err(error, true);

    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }

    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: 'Lỗi server khi xóa người dùng.',
    });
  }
});

/******************************************************************************
                                Export default
******************************************************************************/

export default userRouter;