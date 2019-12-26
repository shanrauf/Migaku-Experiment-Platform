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
  if (typeof value === 'string') {
    if (value.match(/^-{0,1}\d+$/)) {
      // value is a number
      if (value.includes('.')) {
        // it's a float
        return { dataType: 'float', value: parseFloat(value) };
      }
      const numberValue = parseInt(value, 10);
      if (numberValue < 30000) {
        return { dataType: 'smallInt', value: numberValue };
      }
      return { dataType: 'int', value: numberValue };
    }
    // value is some type of string
    if (isJsonString(value)) {
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
