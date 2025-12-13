import logger from 'jet-logger';
import mongoose from 'mongoose';
import ENV from '@src/common/constants/ENV';
import app from './server';


/******************************************************************************
                                Constants
******************************************************************************/

const SERVER_START_MSG = (
  'Express server started on port: ' + ENV.Port.toString()
);


/******************************************************************************
                                  Run
******************************************************************************/

mongoose.connect(ENV.MongoUri)
  .then(() => {
    logger.info('Connected to MongoDB');

    app.listen(ENV.Port, () => {
      logger.info(SERVER_START_MSG);
    });
  })
  .catch((err: unknown) => {
    logger.err('MongoDB connection error: ' + String(err));
  });