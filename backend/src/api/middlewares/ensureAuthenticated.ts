import { ErrorHandler } from './../../utils/index';
import { Request, Response, NextFunction } from 'express';

const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    const err = new ErrorHandler(403, 'You are not authorized for this route');
    throw err;
  }
};

export default ensureAuthenticated;
