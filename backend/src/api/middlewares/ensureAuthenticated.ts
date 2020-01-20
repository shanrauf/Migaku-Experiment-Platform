import { Request, Response, NextFunction } from 'express';

const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    const err = new Error('You are not authorized for this route');
    err.name = 'UnauthorizedError';
    throw err;
  }
};

export default ensureAuthenticated;
