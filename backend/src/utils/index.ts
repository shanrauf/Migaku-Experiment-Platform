export function randomIdGenerator(): string {
  // generates a 21-length alphanumeric string)
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

function IsJsonString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function answerAndRestNull(value, dataType) {
  let allDataTypes = {
    answerSmallInt: null,
    answerInt: null,
    answerFloat: null,
    answerBoolean: null,
    answerVarchar: null,
    answerText: null,
    answerJSON: null
  };

  allDataTypes["answer" + capitalize(dataType)] = value;

  return allDataTypes;
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function inferDataTypeOf(value: any): { dataType: string; value: any } {
  if (typeof value === undefined) {
    // idk what this is... but ignore it XD
    return undefined;
  }
  if (typeof value == "string") {
    if (value.match(/^-{0,1}\d+$/)) {
      // value is a number
      if (value.includes(".")) {
        // it's a float
        return { dataType: "float", value: parseFloat(value) };
      } else {
        value = parseInt(value);
        if (value < 30000) {
          return { dataType: "smallInt", value };
        } else {
          return { dataType: "int", value };
        }
      }
    } else {
      // is some type of text
      if (IsJsonString(value)) {
        // JSON string
        return { dataType: "json", value };
      } else if (value.length <= 255) {
        // VARCHAR(255)
        return { dataType: "varchar", value };
      } else {
        // TEXT
        return { dataType: "text", value };
      }
    }
  } else {
    // Boolean
    return { dataType: "boolean", value };
  }
}
