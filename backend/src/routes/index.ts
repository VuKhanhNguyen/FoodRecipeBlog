import { Router } from 'express';

import PATHS from '@src/common/constants/PATHS';
import AuthRouter from './auth/AuthRoutes';
import UserRouter from './user/UserRouter';
import RecipeRouter from './recipe/RecipeRouter';
import CategoryRouter from './category/CategoryRouter';
import CommentRouter from './comment/CommentRouter';
import FavoriteRouter from './favorite/FavoriteRouter';


/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();



apiRouter.use(PATHS.Auth.Base, AuthRouter);
apiRouter.use(PATHS.Users.Base, UserRouter);
apiRouter.use(PATHS.Recipes.Base, RecipeRouter);
apiRouter.use(PATHS.Categories.Base, CategoryRouter);
apiRouter.use(PATHS.Comments.Base, CommentRouter);
apiRouter.use(PATHS.Favorites.Base, FavoriteRouter);


/******************************************************************************
                                Export default
******************************************************************************/

export default apiRouter;
