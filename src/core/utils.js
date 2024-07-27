/* eslint-disable import/prefer-default-export */
export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }

  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}
