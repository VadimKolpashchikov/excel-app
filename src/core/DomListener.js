import { getListenerMethodName } from '@core/utils';

/* eslint-disable import/prefer-default-export */
export class DomListener {
  constructor(root, listeners = []) {
    if (!root) {
      throw new Error('No $root provided for DomListener!');
    }
    this.$root = root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getListenerMethodName(listener);

      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.$name} Component`);
      }

      this[method] = this[method].bind(this);
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getListenerMethodName(listener);
      this.$root.off(listener, this[method]);
    });
  }
}
