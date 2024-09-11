import { $ } from '@core/dom';
import { activeRoute } from './ActiveRoute';

/* eslint-disable import/prefer-default-export */
export class Router {
  constructor(selector, routes = {}) {
    if (!selector) {
      throw new Error('Selector is not provider in Router');
    }

    this.$root = $(selector);

    if (!this.$root) {
      throw new Error(`Element by selector ${selector} is not found`);
    }

    this.routes = routes;

    this.init();
  }

  init() {
    this.pageChangeHandler = this.pageChangeHandler.bind(this);
    window.addEventListener('hashchange', this.pageChangeHandler);
    this.pageChangeHandler();
  }

  pageChangeHandler() {
    console.log(activeRoute.path, activeRoute.param, this);
    this.$root.html(`<h1>${activeRoute.path}</h1>`);
  }

  destroy() {
    window.removeEventListener('hashchange', this.pageChangeHandler);
  }
}
