/* eslint-disable import/prefer-default-export */
export class Page {
  constructor(param) {
    this.param = param;
  }

  /* eslint-disable class-methods-use-this */
  getRoot() {
    throw new Error('Method "getRoot" should be implemented!');
  }

  beforeRender() {}

  afterRender() {}

  destroy() {}
}
