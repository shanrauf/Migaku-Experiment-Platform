import { ErrorHandler } from './../../utils/index';
import { Request, Response, NextFunction } from 'express';

const ensureAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Matt B, mattvsjapan, runningFromAnki, Shan, Yoga MIA
  const whitelistedDiscordIds = [
    '461760668522119169',
    '334168363440013312',
    '555136385145634816',
    '188108593621368843',
    '383830627218227200'
  ];
  if (
    req.isAuthenticated() &&
    whitelistedDiscordIds.includes(req.user.discordId)
  ) {
    return next();
  } else {
    throw new ErrorHandler(403, 'You are not authorized for this route');
  }
};

export default ensureAdmin;
