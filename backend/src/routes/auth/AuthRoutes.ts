/* eslint-disable max-len */
import { Request, Response, Router } from "express";
import { IRegisterReqBody, ILoginReqBody } from "./types";
import UserService from "@src/services/UserService";
import logger from "jet-logger";
import HTTP_STATUS_CODES from "@src/common/constants/HTTP_STATUS_CODES";
import { sign } from "@src/common/util/jwt";
import { authenticateToken } from "@src/middleware/auth";

const authRouter = Router();

authRouter.post(
  "/register",
  async (req: Request<object, object, IRegisterReqBody>, res: Response) => {
    try {
      const { username, email, password, fullName, avatar } = req.body;

      if (!username || !email || !password) {
        return res.status(HTTP_STATUS_CODES.BadRequest).json({
          error: "Vui lòng cung cấp đầy đủ tên đăng nhập, email và mật khẩu. ",
        });
      }

      const newUser = await UserService.register({
        username,
        email,
        password,
        fullName,
        avatar,
      });

      const token = sign({
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
      });

      return res.status(HTTP_STATUS_CODES.Created).json({
        message: "Đăng ký thành công.",
        token,
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          fullName: newUser.fullName,
          avatar: newUser.avatar,
          role: newUser.role,
        },
      });
    } catch (error) {
      logger.err(error, true);

      const errorMessage =
        error instanceof Error && error.message.includes("Email đã tồn tại")
          ? error.message
          : "Lỗi server khi đăng ký.";

      const statusCode =
        error instanceof Error && error.message.includes("Email đã tồn tại")
          ? HTTP_STATUS_CODES.Conflict
          : HTTP_STATUS_CODES.InternalServerError;

      return res.status(statusCode).json({ error: errorMessage });
    }
  }
);

authRouter.post(
  "/login",
  async (req: Request<object, object, ILoginReqBody>, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(HTTP_STATUS_CODES.BadGateway).json({
          error: "Vui lòng nhập tên đăng nhập và mật khẩu.",
        });
      }

      const user = await UserService.login(username, password);

      const token = sign({
        id: user._id,
        username: user.username,
        role: user.role,
      });

      return res.status(HTTP_STATUS_CODES.Ok).json({
        message: "Đăng nhập thành công.",
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          avatar: user.avatar,
          role: user.role,
        },
      });
    } catch (error) {
      logger.err(error, true);

      const errorMessage =
        error instanceof Error &&
        error.message.includes("Tên đăng nhập hoặc mật khẩu không đúng.")
          ? error.message
          : "Lỗi server khi đăng nhập.";
      const statusCode =
        error instanceof Error &&
        error.message.includes("Tên đăng nhập hoặc mật khẩu không đúng.")
          ? HTTP_STATUS_CODES.Unauthorized
          : HTTP_STATUS_CODES.InternalServerError;
      return res.status(statusCode).json({ error: errorMessage });
    }
  }
);

authRouter.get(
  "/me",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call
      const userId = (req as any).user.id.toString();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const user = await UserService.getOne(userId);

      if (!user) {
        return res
          .status(HTTP_STATUS_CODES.NotFound)
          .json({ error: "Người dùng không tồn tại." });
      }

      return res.status(HTTP_STATUS_CODES.Ok).json({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          avatar: user.avatar,
          role: user.role,
        },
      });
    } catch (error) {
      logger.err(error, true);
      return res
        .status(HTTP_STATUS_CODES.InternalServerError)
        .json({ error: "Lỗi server khi lấy thông tin người dùng." });
    }
  }
);

export default authRouter;
