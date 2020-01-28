import { Request, Response, Router, NextFunction } from "express";
import passport from "passport";
import logger from "../../../loaders/logger";
import middlewares from "../../middlewares";

const route = Router();

export default app => {
  app.use("/auth", route);

  route.get(
    "/discord",
    middlewares.sanitizeRedirectUrl,
    (req: Request, res: Response, next: NextFunction) => {
      logger.debug("GET /discord");

      const state =
        "redirect" in req.query ? `redirect=${req.query.redirect}` : undefined;
      const authenticator = passport.authenticate("oauth2", { state });
      return authenticator(req, res, next);
    }
  );

  route.get(
    "/discord/redirect",
    passport.authenticate("oauth2"),
    (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.debug("GET /discord/redirect with user %o", req.user);

        if (req.query.state.includes("redirect")) {
          // not best implementation of dynamic redirect urls...
          const redirectUrl = decodeURIComponent(req.query.state.split("=")[1]);
          res.status(301).redirect(redirectUrl);
        } else {
          const defaultRedirect =
            process.env.NODE_ENV === "development"
              ? "localhost:8080"
              : "trials.massimmersionapproach.com";
          res.status(301).redirect(defaultRedirect);
        }
      } catch (err) {
        logger.error(err);
        return next(err);
      }
    }
  );
};
