/* eslint-disable import/prefer-default-export */
export class Page {
  constructor(params) {
    this.params = params;
  }

  /* eslint-disable class-methods-use-this */
  getRoot() {
    throw new Error('Method "getRoot" should be implemented!');
  }

  afterRender() {

  }

  destroy() {

  }
}
