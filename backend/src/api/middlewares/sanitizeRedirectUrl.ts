import { Request, Response, NextFunction } from 'express';
import { URL } from 'url';

const hostWhitelist = [
  'localhost',
  'trials.massimmersionapproach.com',
  'massimmersionapproach.com'
];

/**
 * Prevents redirect urls that we don't approve of i.e permit trials.massimmersionapproach.com, NOT maliciousSite.com
 */
const sanitizeRedirectUrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ('redirect' in req.query) {
    const { host, href } = new URL(req.query.redirect);
    if (hostWhitelist.includes(host)) {
      return next();
    }
    throw new Error(`The following is an invalid redirect url: ${href}`);
  }
};

export default sanitizeRedirectUrl;
