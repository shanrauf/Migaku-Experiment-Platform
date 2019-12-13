import bcrypt from "bcryptjs";
import passport from "passport";
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;

import LoggerInstance from "./logger";
import config from "../config";
import { Participant } from "../models/participant";

export default async () => {
  try {
    passport.use(
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password"
        },
        async (email, password, done) => {
          try {
            const participant = await Participant.findOne({ where: { email } });
            const passwordsMatch = await bcrypt.compare(
              password,
              participant.password
            );

            if (passwordsMatch) {
              return done(null, participant);
            } else {
              return done("Incorrect Username / Password");
            }
          } catch (error) {
            done(error);
          }
        }
      )
    );

    passport.use(
      new JWTStrategy(
        {
          jwtFromRequest: req => req.cookies.jwt,
          secretOrKey: config.jwtSecret
        },
        (jwtPayload, done) => {
          if (Date.now() > jwtPayload.expires) {
            return done("jwt expired");
          }

          return done(null, jwtPayload);
        }
      )
    );
    return passport;
  } catch (e) {
    LoggerInstance.error("🔥 Error on dependency injector loader: %o", e);
    throw e;
  }
};
