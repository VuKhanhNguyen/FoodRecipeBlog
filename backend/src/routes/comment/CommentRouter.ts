/* eslint-disable max-len */
import HTTP_STATUS_CODES from '@src/common/constants/HTTP_STATUS_CODES';
import { RouteError } from '@src/common/util/route-errors';
import CommentService from '@src/services/CommentService';
import { Router, Request, Response } from 'express';
import logger from 'jet-logger';
import { ICreateCommentReqBody, IUpdateCommentReqBody } from './types';
import { authenticateToken } from '@src/middleware/auth';


const commentRouter = Router();

commentRouter.get('/all', async (_: Request, res: Response) => {
  try {
    const comments = await CommentService.getAll();
    return res.status(HTTP_STATUS_CODES.Ok).json({ comments });
  } catch (error) {
    logger.err(error, true);
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({ error: 'Lỗi server khi lấy danh sách bình luận | 500' });
  }
});

commentRouter.get('/recipe/:recipeId', async (req: Request, res: Response) => {
  try {
    const { recipeId } = req.params;
    const comments = await CommentService.getByRecipeId(recipeId);
    return res.status(HTTP_STATUS_CODES.Ok).json({ comments });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: 'Lỗi server khi lấy bình luận. | 500',
    });
  }
});


commentRouter.get('/author/:author', async (req: Request, res: Response) => {
  try {
    const { author } = req.params;
    const comments = await CommentService.getByAuthor(author);
    return res.status(HTTP_STATUS_CODES.Ok).json({ comments });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: 'Lỗi server khi lấy bình luận. | 500',
    });
  }
});

commentRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await CommentService.getOne(id);
    return res.status(HTTP_STATUS_CODES.Ok).json({ comment });
  } catch (error) {
    logger.err(error, true);
    if (error instanceof RouteError) {
      return res.status(error.status).json({ error: error.message });
    }
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({
      error: 'Lỗi server khi lấy thông tin bình luận. | 500',
    });
  }
});

commentRouter.post('/', authenticateToken, async (req: Request<object, object, ICreateCommentReqBody>, res: Response) => {
  try {
    const commentData = req.body;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const userId = (req as any).user.id;

    // commentData.userId = userId as unknown as IComment['userId'];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newComment = await CommentService.createComment({ ...commentData, userId: userId });
    return res.status(HTTP_STATUS_CODES.Created).json({ comment: newComment });
  } catch (error) {
    logger.err(error, true);
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({ error: 'Lỗi server khi tạo bình luận. | 500' });
  }
});

commentRouter.put('/:id', authenticateToken, async (req: Request<{ id: string }, object, IUpdateCommentReqBody>, res: Response) => {
  try {
    const { id } = req.params;
    const commentData = req.body;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const userId = (req as any).user.id;

    const comment = await CommentService.getOne(id);

    if (!comment) {
      throw new RouteError(HTTP_STATUS_CODES.NotFound, 'Bình luận không tồn tại');
    }

    if (comment.userId.toString() !== userId) {
      return res.status(HTTP_STATUS_CODES.Forbidden).json({ error: 'Bạn không có quyền cập nhật bình luận này. | 403' });
    }

    const updatedComment = await CommentService.updateComment(id, commentData);
    return res.status(HTTP_STATUS_CODES.Ok).json({ comment: updatedComment });
  } catch (error) {
    logger.err(error, true);
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({ error: 'Lỗi server khi cập nhật bình luận. | 500' });
  }
});

commentRouter.delete('/:id', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const userId = (req as any).user.id;

    const comment = await CommentService.getOne(id);
    if (!comment) {
      throw new RouteError(HTTP_STATUS_CODES.NotFound, 'Bình luận không tồn tại');
    }

    if (comment.userId.toString() !== userId) {
      return res.status(HTTP_STATUS_CODES.Forbidden).json({ error: 'Bạn không có quyền xóa bình luận này. | 403' });
    }

    await CommentService.deleteComment(id);
    return res.status(HTTP_STATUS_CODES.NoContent).send();
  } catch (error) {
    logger.err(error, true);
    return res.status(HTTP_STATUS_CODES.InternalServerError).json({ error: 'Lỗi server khi xóa bình luận. | 500' });
  }
});

export default commentRouter;