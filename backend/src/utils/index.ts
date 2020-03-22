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
export function formatDate(dateObject: Date, options = {}, language = "en-US") {
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
  Object.keys(reqQuery).forEach(key => {
    const sequelizeFilter = sequelizeFilters[key](reqQuery[key]);
    Object.keys(sequelizeFilter).forEach(filterKey => {
      switch (filterKey) {
        case "where":
          filters["where"] = {
            ...filters["where"],
            ...sequelizeFilter[filterKey]
          };
          break;

        case "include":
          filters["include"].push(...sequelizeFilter[filterKey]);
          break;
      }
    });
  });
  return filters;
}
