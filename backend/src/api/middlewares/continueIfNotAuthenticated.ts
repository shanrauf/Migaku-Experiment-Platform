import { Request, Response, NextFunction } from 'express';

const continueIfNotAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  // user already signed in... how do I let frontend know...
};

export default continueIfNotAuthenticated;
