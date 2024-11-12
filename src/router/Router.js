import { $ } from '@core/methods/dom';
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
    this.routesName = Object.keys(routes);
    this.page = null;

    this.init();
  }

  init() {
    this.pageChangeHandler = this.pageChangeHandler.bind(this);
    window.addEventListener('hashchange', this.pageChangeHandler);
    this.pageChangeHandler();
  }

  pageChangeHandler(event) {
    if (activeRoute.incorrectPath) {
      event?.preventDefault();
      activeRoute.adjustPath(activeRoute.path);
      return;
    }

    this.$root.clear();
    this.page?.destroy();

    const routeName = this.routesName.find(
      (key) => activeRoute.path.includes(key),
    );

    const Page = this.routes[routeName] ?? this.routes.dashboard;
    this.page = new Page(activeRoute.param);

    this.page.beforeRender();
    this.$root.append(this.page.getRoot());
    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this.pageChangeHandler);
  }
}
