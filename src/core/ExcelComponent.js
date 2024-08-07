import { DomListener } from '@core/DomListener';

/* eslint-disable import/prefer-default-export */
export class ExcelComponent extends DomListener {
  $html = '';

  constructor(root, options = {}) {
    super(root, options.listeners);
    this.$name = options.name || '';
    this.emitter = options.emitter;

    this.prepare();
  }

  prepare() {
    return this;
  }

  $emit(eventName, args) {
    this.emitter.emit(eventName, args);
  }

  $subscribe(eventName, fn) {
    return this.emitter.subscribe(eventName, fn);
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
