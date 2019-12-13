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
