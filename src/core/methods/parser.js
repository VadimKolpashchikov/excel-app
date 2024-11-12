/* eslint-disable import/prefer-default-export */
export function parseExpression(value) {
  if (!value) return '';

  if (value.startsWith('=')) {
    const preparedValue = value.slice(1);

    try {
      // TODO переписать без eval
      /* eslint-disable-next-line */
      return eval(preparedValue)
    } catch {
      return value;
    }
  }

  return value;
}
