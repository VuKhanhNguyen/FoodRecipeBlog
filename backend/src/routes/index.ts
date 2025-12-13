import { Router } from 'express';

import PATHS from '@src/common/constants/PATHS';
import AuthRouter from './auth/AuthRoutes';
import UserRouter from './user/UserRouter';


/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();



apiRouter.use(PATHS.Auth.Base, AuthRouter);
apiRouter.use(PATHS.Users.Base, UserRouter);


/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
