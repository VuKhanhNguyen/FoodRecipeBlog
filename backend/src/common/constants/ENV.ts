import jetEnv, { num, str } from 'jet-env';
import { isValueOf } from 'jet-validators';

import { NODE_ENVS } from '.';


/******************************************************************************
                                 Setup
******************************************************************************/

const ENV = jetEnv({
  NodeEnv: isValueOf(NODE_ENVS),
  Port: num,
  MongoUri: str,
});


/******************************************************************************
                            Export default
******************************************************************************/

export default ENV;
