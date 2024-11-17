export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }

  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

export function getListenerMethodName(eventName) {
  return `on${capitalize(eventName)}`;
}

export function kebabize(str) {
  return str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    (match, prev) => (prev ? '-' : '') + match.toLowerCase(),
  );
}

export function debounce(fn, wait = 300) {
  let timeout;

  return (...args) => {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
