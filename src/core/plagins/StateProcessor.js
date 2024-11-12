import { debounce } from '../methods/utils';

/* eslint-disable import/prefer-default-export */
export class StateProcessor {
  constructor(manager, { delay = 300 } = {}) {
    this.manager = manager;
    this.listen = debounce(this.listen.bind(this), delay);
  }

  listen(state) {
    this.saver.save(state);
  }

  get() {
    return this.manager.get();
  }
}
