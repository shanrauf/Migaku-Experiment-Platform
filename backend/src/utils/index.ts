export function randomIdGenerator(): string {
  // generates a 21-length alphanumeric string
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

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

function isJsonString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function inferDataTypeOf(
  value: string | number | boolean | undefined
): { dataType: string; value: string | number | boolean } {
  if (typeof value === undefined) {
    return null;
  }
  if (typeof value === null) {
    return null;
  }
  if (typeof value === "string") {
    if (value.match(/^[1-9]\d*(\.\d+)?$/)) {
      // value is a number
      if (value.includes(".")) {
        // this function isn't catching floats...
        // it's a float
        return { dataType: "float", value: parseFloat(value) };
      }
      const numberValue = parseInt(value, 10);
      if (numberValue < 30000) {
        // arbitrary value
        return { dataType: "smallInt", value: numberValue };
      }
      return { dataType: "int", value: numberValue };
    }
    // value is some type of string
    if (isJsonString(value)) {
      // JSON string
      return { dataType: "json", value };
    }
    if (value.length <= 255) {
      // VARCHAR(255)
      return { dataType: "varchar", value };
    }
    // TEXT
    return { dataType: "text", value };
  }
  // Boolean
  if (typeof value === "boolean") {
    return { dataType: "boolean", value };
  } else {
    // throw an error... idk what is going to catch this error though
    throw new Error("Unknown value");
  }
}

export async function generateSequelizeFilters(
  sequelizeFilters: object,
  reqQuery: object
): Promise<object> {
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
