/* eslint-disable max-len */
import HTTP_STATUS_CODES from '@src/common/constants/HTTP_STATUS_CODES';
import { verify } from '@src/common/util/jwt';
import { Request, Response, NextFunction } from 'express';
import { IJwtPayload, IRequestWithUser } from './types';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(HTTP_STATUS_CODES.Unauthorized).json({
      error: 'Token không tồn tại | 401',
    });
  }

  try {
    const decoded = verify(token) as IJwtPayload;

    if (typeof decoded === 'string') {
      return res.status(HTTP_STATUS_CODES.Forbidden).json({
        error: 'Token không hợp lệ | 403',
      });
    }

    (req as Request & IRequestWithUser).user = decoded;
    next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return res.status(HTTP_STATUS_CODES.Forbidden).json({
      error: 'Token không hợp lệ | 403',
    });
  }


}