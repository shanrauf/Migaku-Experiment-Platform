import { Response } from 'express';
/**
 * Generates a random 20-22 character string
 */
export function randomIdGenerator(): string {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

/**
 * Converts Date object into a human-readable format
 */
export function formatDate(dateObject: Date, options = {}, language = 'en-US') {
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
    include: []
  };
  if (!reqQuery) {
    return null;
  }
  Object.keys(reqQuery).forEach(key => {
    const sequelizeFilter = sequelizeFilters[key](reqQuery[key]);
    Object.keys(sequelizeFilter).forEach(filterKey => {
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

export const handleError = (err: ErrorHandler, res: Response) => {
  let { statusCode, message } = err;

  /**
   * If I don't handle an error and want to hide the actual message/stack trace
   */
  if (statusCode >= 500) {
    message = 'There was an error while processing your request.';
  }
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message
  });
};
