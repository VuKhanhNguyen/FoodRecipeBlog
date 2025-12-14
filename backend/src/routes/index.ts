import { Router } from 'express';

import PATHS from '@src/common/constants/PATHS';
import AuthRouter from './auth/AuthRoutes';
import UserRouter from './user/UserRouter';
import RecipeRouter from './recipe/RecipeRouter';


/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();



apiRouter.use(PATHS.Auth.Base, AuthRouter);
apiRouter.use(PATHS.Users.Base, UserRouter);
apiRouter.use(PATHS.Recipes.Base, RecipeRouter);


/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
