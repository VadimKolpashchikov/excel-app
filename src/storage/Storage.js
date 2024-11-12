class Storage {
  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static getAllStartsWith(prefix) {
    const result = [];

    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);

      if (key.startsWith(prefix)) {
        result.push(key);
      }
    }

    return result;
  }

  static set(key, value = '') {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static delete(key) {
    localStorage.removeItem(key);
  }
}
/* eslint-disable import/prefer-default-export */
export { Storage as storage };
