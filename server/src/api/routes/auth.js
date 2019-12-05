import { Router } from "express";
import AuthService from "../../services/auth";
import middlewares from "../middlewares";

const route = Router();

export default app => {
  app.use("/auth", route);

  route.post(
    "/signup",
    // doSomething({
    //   body: {
    //     name: "Shan",
    //     email: "asdf@gmail.com",
    //     password: "asdf"
    //   }
    // }),
    async (req, res, next) => {
      console.log("Calling Sign-Up endpoint with body: %o", req.body);
      try {
        const { user, token } = await authServiceInstance.SignUp(req.body);
        return res.status(201).json({ user, token });
      } catch (e) {
        console.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  route.post(
    "/signin",
    // doSomething({
    //   body: {
    //     name: "Shan",
    //     email: "asdf@gmail.com",
    //     password: "asdf"
    //   }
    // }),
    async (req, res, next) => {
      console.log("Calling Sign-In endpoint with body: %o", req.body);
      try {
        const { email, password } = req.body;
        const { user, token } = await authServiceInstance.SignIn(
          email,
          password
        );
        return res.json({ user, token }).status(200);
      } catch (e) {
        console.error("🔥 error: %o", e);
        return next(e);
      }
    }
  );

  /**
   * @TODO Let's leave this as a place holder for now
   */
  route.post("/logout", middlewares.isAuth, (req, res, next) => {
    console.log("Debug: Calling Sign-Out endpoint with body: %o", req.body);
    try {
      return res.status(200).end();
    } catch (e) {
      console.error("🔥 error %o", e);
      return next(e);
    }
  });
};
