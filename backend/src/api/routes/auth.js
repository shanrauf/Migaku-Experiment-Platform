import { Router } from "express";
import AuthService from "../../services/auth";
import middlewares from "../middlewares";
import passport from "passport";
import jwt from "jsonwebtoken";

import config from "../../config";
const route = Router();

export default app => {
  app.use("/auth", route);

  route.post(
    "/signup",
    middlewares.continueIfNotAuthenticated,
    async (req, res, next) => {
      console.log("Calling Sign-Up endpoint with body: %o", req.body);
      try {
        const authServiceInstance = new AuthService();
        let { email, password, name, discordUsername, age, sex } = req.body;
        const { user, token } = await authServiceInstance.SignUp(
          email,
          password,
          name,
          discordUsername,
          age,
          sex
        );
        res.cookie("jwt", token, { httpOnly: true, secure: true });
        // res.cookie('jwt', jwt, { httpOnly: true, secure: true });
        return res.status(201).json({ user });
      } catch (e) {
        console.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  route.post(
    "/signin",
    middlewares.continueIfNotAuthenticated,
    async (req, res, next) => {
      // console.log("Calling Sign-In endpoint with body: %o", req.body);
      // try {
      //   const authServiceInstance = new AuthService();
      //   const { email, password } = req.body;
      //   const { user, token } = await authServiceInstance.SignIn(
      //     email,
      //     password
      //   );
      //   return res.json({ user, token }).status(200);
      // } catch (e) {
      //   console.error("🔥 error: %o", e);
      //   return next(e);
      // }

      passport.authenticate("local", { session: false }, (error, user) => {
        if (error || !user) {
          res.status(400).json({ error });
        }

        /** This is what ends up in our JWT */
        const payload = {
          name: user.name,
          discordUsername: user.discordUsername,
          expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS)
        };

        /** assigns payload to req.user */
        req.login(payload, { session: false }, error => {
          if (error) {
            res.status(400).send({ error });
          }

          /** generate a signed json web token and return it in the response */
          const token = jwt.sign(JSON.stringify(payload), config.jwtSecret);

          /** assign our jwt to the cookie */
          res.cookie("jwt", token, { httpOnly: true, secure: true });
          res.status(200).send({ user });
        });
      });
    }
  );

  /**
   * @TODO Let's leave this as a place holder for now
   */
  route.post(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    (req, res, next) => {
      console.log("Debug: Calling Sign-Out endpoint with body: %o", req.body);
      try {
        return res.status(200).end();
      } catch (e) {
        console.error("🔥 error %o", e);
        return next(e);
      }
    }
  );
};
