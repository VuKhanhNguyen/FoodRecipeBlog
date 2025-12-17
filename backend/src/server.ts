import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import logger from "jet-logger";

import BaseRouter from "@src/routes";

import Paths from "@src/common/constants/PATHS";
import ENV from "@src/common/constants/ENV";
import HTTP_STATUS_CODES, {
  HttpStatusCodes,
} from "@src/common/constants/HTTP_STATUS_CODES";
import { RouteError } from "@src/common/util/route-errors";
import { NODE_ENVS } from "@src/common/constants";

/******************************************************************************
                                Setup
******************************************************************************/

const app = express();

// **** Middleware **** //

// CORS first so even errors include CORS headers
const allowedOrigin = "http://localhost:5173";
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length"],
  })
);

// Basic middleware with higher payload limits for base64 images
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

// Show routes called in console during development
if (ENV.NodeEnv === NODE_ENVS.Dev) {
  app.use(morgan("dev"));
}

// Security
if (ENV.NodeEnv === NODE_ENVS.Production) {
  // eslint-disable-next-line n/no-process-env
  if (!process.env.DISABLE_HELMET) {
    app.use(helmet());
  }
}

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (ENV.NodeEnv !== NODE_ENVS.Test.valueOf()) {
    logger.err(err, true);
  }
  let status: HttpStatusCodes = HTTP_STATUS_CODES.BadRequest;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({ error: err.message });
  }
  return next(err);
});

/******************************************************************************
                                Export default
******************************************************************************/

export default app;
