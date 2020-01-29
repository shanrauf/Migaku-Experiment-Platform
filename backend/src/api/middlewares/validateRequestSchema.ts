import { Request, Response, NextFunction } from "express";
import { validateOrReject, ValidatorOptions } from "class-validator";
import { plainToClass, classToPlain } from "class-transformer";

const validationOptions: ValidatorOptions = {
  forbidUnknownValues: true,
  skipMissingProperties: true,
  whitelist: true
};

/**
 * Higher-order function that takes in the schemas for this endpoint and returns a middleware function that validates the sent request payload.
 * TODO: Validate req.params? (e.x to avoid SQL injection);
 * TODO: Validate values of all query and body values? (e.x to avoid SQL injection)
 * TODO: I currently clear req.query and req.body if no schema exists for the route, but what if want to use next() to redirect a route to another that needs req.query/body?...
 */
const validateRequestSchema = (reqQueryClass?, reqBodyClass?) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let allErrors = [];

    if (!reqQueryClass) {
      req.query = {};
    }
    if (!reqBodyClass) {
      req.body = {};
    }

    if (req.query) {
      const query = plainToClass(reqQueryClass, req.query, {
        excludeExtraneousValues: true
      });
      validateOrReject(query, validationOptions).catch(errors => {
        allErrors.push(...errors);
      });
      req.query = classToPlain(query);
      /**
       * Removes undefined key-value pairs from above.
       */
      Object.keys(req.query).forEach(key =>
        req.query[key] === undefined ? delete req.query[key] : {}
      );
    }

    if (req.body) {
      const body = plainToClass(reqBodyClass, req.body, {
        excludeExtraneousValues: true
      });
      validateOrReject(body, validationOptions).catch(errors => {
        allErrors.push(...errors);
      });
      req.body = classToPlain(body);
      /**
       * Removes undefined key-value pairs from above.
       */
      Object.keys(req.body).forEach(key =>
        req.body[key] === undefined ? delete req.body[key] : {}
      );
    }

    if (allErrors.length > 0) {
      res.status(400).json({ errors: allErrors });
    } else {
      return next();
    }
  };
};

export default validateRequestSchema;
