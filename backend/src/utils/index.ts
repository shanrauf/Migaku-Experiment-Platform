import { Response } from 'express';
import logger from '../loaders/logger';
/**
 * Generates a random 20-22 character string
 */
export function randomIdGenerator(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

/**
 * Converts Date object into a human-readable format
 */
export function formatDate(
  dateObject: Date,
  options = {},
  language = 'en-US'
): string {
  // options = {
  //   weekday: 'long',
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  //   hour12: true
  // }
  // let language = "en-US" || "hi-IN" || "ja-JP"
  return dateObject.toLocaleDateString(language, options);
}

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Translates an API request's query parameters into a format that Sequelize understands
 */
export function generateSequelizeFilters(
  sequelizeFilters: object,
  reqQuery: object
): object {
  const filters = {
    where: {},
    include: [],
    group: null
  };
  if (!reqQuery) {
    return null;
  }
  console.log(reqQuery);
  Object.keys(reqQuery).forEach((key) => {
    const sequelizeFilter = sequelizeFilters[key](reqQuery[key]);
    if (key === 'filters') {
      filters['include'].push(...sequelizeFilter);
    }
    Object.keys(sequelizeFilter).forEach((filterKey) => {
      switch (filterKey) {
        case 'where':
          filters['where'] = {
            ...filters['where'],
            ...sequelizeFilter[filterKey]
          };
          break;
        case 'include':
          filters['include'].push(...sequelizeFilter[filterKey]);
          break;
        case 'group':
          if (!filters?.group) {
            filters.group = sequelizeFilter[filterKey];
          } else {
            filters['group'].concat(sequelizeFilter[filterKey]);
          }
          break;
        default:
          break;
      }
    });
  });
  return filters;
}

export class ErrorHandler extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

/**
 * TODO: Remove duplicate code, find better way to handle errors.
 * @param err Error
 * @param res Response
 */
export const handleError = (err: any, res: Response): void => {
  const { statusCode } = err;

  if (err instanceof ErrorHandler) {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message:
        statusCode >= 500
          ? 'There was an error while processing your request.'
          : err.message
    });
  } else {
    logger.error(err);

    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message:
        statusCode >= 500
          ? 'There was an error while processing your request.'
          : err.message
    });
  }
};
