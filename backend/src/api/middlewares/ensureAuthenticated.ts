import { Request, Response, NextFunction } from 'express';

const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/api/auth/discord');
  }
};

export default ensureAuthenticated;
