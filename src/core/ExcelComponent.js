import { DomListener } from '@core/DomListener';

/* eslint-disable import/prefer-default-export */
export class ExcelComponent extends DomListener {
  $html = '';

  constructor(root, options = {}) {
    super(root, options.listeners);
    this.$name = options.name || '';
  }

  getHTML() {
    return this.$html;
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
