import { Request, Response, NextFunction } from 'express';
import logger from '../../loaders/logger';
/**
 * Prevents access to a specific route by pretending it doesn't exist...
 */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental */
const logRequest = (req: Request, res: Response, next: NextFunction) => {
  logger.silly(`${req.method} ${req.url} w/ body %o`, req.body);
  return next();
};

export default logRequest;
