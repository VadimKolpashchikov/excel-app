import { DomListener } from '@core/DomListener';

/* eslint-disable import/prefer-default-export */
export class ExcelComponent extends DomListener {
  $html = '';

  constructor(root, options = {}) {
    super(root, options.listeners);
    this.$name = options.name || '';
    this.$store = options.store;
    this.emitter = options.emitter;
    this.unsubscribers = [];
    this.storeSub = null;

    this.prepare();
  }

  prepare() {
    return this;
  }

  $emit(eventName, args) {
    this.emitter.emit(eventName, args);
  }

  $on(eventName, fn) {
    const unsub = this.emitter.subscribe(eventName, fn);

    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.$store.dispatch(action);
  }

  $subscribe(fn) {
    this.storeSub = this.$store.subscribe(fn);
  }

  getHTML() {
    return this.$html;
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsubFn) => unsubFn());
    this.storeSub.unsubscribe();
  }
}
