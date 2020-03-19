import { Request, Response, NextFunction } from 'express';

/**
 * Prevents access to a specific route by pretending it doesn't exist...
 */
const blockRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    return res.status(404).json({message: "Not found."})
};

export default blockRoute;
