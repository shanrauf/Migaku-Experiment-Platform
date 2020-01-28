import { Request, Response, NextFunction } from "express";
import { validateOrReject } from "class-validator";
import { plainToClass } from "class-transformer";

/**
 * Higher-order function that takes in the schemas for this endpoint and returns a middleware function that validates the sent request payload.
 * TODO: Validate req.params? (e.x to avoid SQL injection);
 */
const validateRequestSchema = (reqQueryClass?, reqBodyClass?) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let allErrors = [];

    if (req.query) {
      const query = plainToClass(reqQueryClass, req.query);
      validateOrReject(query).catch(errors => {
        allErrors.push(...errors);
      });
    }

    if (req.body) {
      const body = plainToClass(reqBodyClass, req.body);
      validateOrReject(body).catch(errors => {
        allErrors.push(...errors);
      });
    }

    if (allErrors.length > 0) {
      res.status(400).json({ errors: allErrors });
    } else {
      return next();
    }
  };
};

export default validateRequestSchema;
