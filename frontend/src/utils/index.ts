export function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function dateToISO(dateObject: Date): string {
  return dateObject.toISOString().slice(0, 10);
}

export function formatDate(
  dateObject: Date,
  options: object = {},
  language: string = 'en-US'
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

export function dateToTimeUntil(dateObject: Date): string {
  let oneDay = 8.64e7;
  let oneMonth = 2.678e9;

  let now = Date.now();
  let millisecondsLeft = dateObject.getTime() - now;

  if (millisecondsLeft > oneMonth) {
    return Math.floor(millisecondsLeft / oneMonth) + ' months left';
  } else if (millisecondsLeft > oneDay) {
    return Math.floor(millisecondsLeft / oneDay) + ' days left';
  }
}

export function truncate(value: string, limit: number = 150): string {
  if (value.length > limit) {
    return value.slice(0, limit + 1) + '...';
  }
  return value;
}
