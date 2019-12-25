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

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function answerAndRestNull(value, dataType): object {
  const allDataTypes = {
    answerSmallInt: null,
    answerInt: null,
    answerFloat: null,
    answerBoolean: null,
    answerVarchar: null,
    answerText: null,
    answerJSON: null
  };

  allDataTypes[`answer${capitalize(dataType)}`] = value;

  return allDataTypes;
}

export function inferDataTypeOf(
  value: string | number | boolean
): { dataType: string; value: string | number | boolean } {
  if (typeof value === undefined) {
    return null;
  }
  if (typeof value === 'string') {
    if (value.match(/^-{0,1}\d+$/)) {
      // value is a number
      if (value.includes('.')) {
        // it's a float
        return { dataType: 'float', value: parseFloat(value) };
      }
      const numberValue = parseInt(value);
      if (numberValue < 30000) {
        return { dataType: 'smallInt', value: numberValue };
      }
      return { dataType: 'int', value: numberValue };
    }
    // is some type of text
    if (IsJsonString(value)) {
      // JSON string
      return { dataType: 'json', value };
    }
    if (value.length <= 255) {
      // VARCHAR(255)
      return { dataType: 'varchar', value };
    }
    // TEXT
    return { dataType: 'text', value };
  }
  // Boolean
  return { dataType: 'boolean', value };
}
