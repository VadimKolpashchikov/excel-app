import { initState } from '@const/initState';
import { mainPrefix } from '@const/storage';
import { storage } from '@storage/Storage';

/* eslint-disable import/prefer-default-export */
export class LocalStorageManager {
  constructor(name) {
    this.name = `${mainPrefix}${name}`;
    this.inited = false;
  }

  save(state) {
    storage.set(this.name, state);

    return Promise.resolve();
  }

  get() {
    // return Promise.resolve(
    //   storage.get(this.name),
    // );

    // IMITATION WAITING
    return new Promise((resolve) => {
      const state = storage.get(this.name);

      setTimeout(() => {
        resolve(state);
      }, 1200);
    });
  }

  init() {
    if (!storage.get(this.name)) {
      storage.set(this.name, initState);
    }
  }
}
