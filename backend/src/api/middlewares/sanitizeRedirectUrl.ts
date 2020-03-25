import { Request, Response, NextFunction } from 'express';
import { URL } from 'url';

const hostWhitelist = [
  'localhost:3000',
  'trials.massimmersionapproach.com',
  'massimmersionapproach.com'
];

/**
 * Prevents redirect urls that we don't approve of i.e permit trials.massimmersionapproach.com, NOT maliciousSite.com.
 * TODO: Doesn't work on localhost.
 * TODO: Should require http(s) in url redirects.
 */
const sanitizeRedirectUrl = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if ('redirect' in req.query) {
    const { host, href } = new URL(req.query.redirect);

    if (hostWhitelist.includes(host)) {
      next();
    }
    throw new Error(`The following is an invalid redirect url: ${href}`);
  }
  res.status(400).json({ message: 'Missing a redirect URL' });
};

export default sanitizeRedirectUrl;
