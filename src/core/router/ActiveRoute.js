class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1);
  }

  static get params() {
    return ActiveRoute.path.slice(1).split('/')[1];
  }

  static get incorrectPath() {
    return !window.location.hash || ActiveRoute.path.charAt(0) !== '/';
  }

  static adjustPath(path = '') {
    window.location.hash = `/${path}`;
  }
}

/* eslint-disable import/prefer-default-export */
export { ActiveRoute as activeRoute };
