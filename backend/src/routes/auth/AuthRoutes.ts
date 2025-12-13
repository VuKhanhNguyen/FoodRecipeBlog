/* eslint-disable max-len */
import { Request, Response, Router } from 'express';
import { IRegisterReqBody, ILoginReqBody } from './types';
import UserService from '@src/services/UserService';
import logger from 'jet-logger';
import HTTP_STATUS_CODES from '@src/common/constants/HTTP_STATUS_CODES';


const authRouter = Router();

authRouter.post('/register', async (req: Request<object, object, IRegisterReqBody>, res: Response) => {
  try {
    const { username, email, password, fullName, avatar } = req.body;

    if (!username || !email || !password) {
      return res.status(HTTP_STATUS_CODES.BadRequest).json({
        error: 'Vui lòng cung cấp đầy đủ tên đăng nhập, email và mật khẩu. ',
      });
    }

    const newUser = await UserService.register({
      username,
      email,
      password,
      fullName,
      avatar,
    });

    return res.status(HTTP_STATUS_CODES.Created).json({
      message: 'Đăng ký thành công.',
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
      },
    });
  } catch (error) {
    logger.err(error, true);

    const errorMessage = error instanceof Error && error.message.includes('Email đã tồn tại')
      ? error.message
      : 'Lỗi server khi đăng ký.';

    const statusCode = error instanceof Error && error.message.includes('Email đã tồn tại')
      ? HTTP_STATUS_CODES.Conflict
      : HTTP_STATUS_CODES.InternalServerError;

    return res.status(statusCode).json({ error: errorMessage });
  }
});

authRouter.post('/login', async (req: Request<object, object, ILoginReqBody>, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(HTTP_STATUS_CODES.BadGateway).json({
        error: 'Vui lòng nhập tên đăng nhập và mật khẩu.',
      });
    }

    const user = await UserService.login(username, password);

    return res.status(HTTP_STATUS_CODES.Ok).json({
      message: 'Đăng nhập thành công.',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    logger.err(error, true);

    const errorMessage = error instanceof Error && error.message.includes('Tên đăng nhập hoặc mật khẩu không đúng.')
      ? error.message
      : 'Lỗi server khi đăng nhập.';
    const statusCode = error instanceof Error && error.message.includes('Tên đăng nhập hoặc mật khẩu không đúng.')
      ? HTTP_STATUS_CODES.Unauthorized
      : HTTP_STATUS_CODES.InternalServerError;
    return res.status(statusCode).json({ error: errorMessage });
  }
});

export default authRouter;