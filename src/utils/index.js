export function camelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index == 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function formatDateOld(dateObject) {
  let monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  let day = dateObject.getDate();
  let monthIndex = dateObject.getMonth();
  let year = dateObject.getFullYear();
  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

export function dateToISO(dateObject) {
  return dateObject.toISOString().slice(0, 10);
}

export function formatDate(dateObject, options = {}, language = 'en-US') {
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

export function truncate(value, limit = 150) {
  if (value.length > limit) {
    return value.slice(0, limit + 1) + '...';
  }
  return value;
}
