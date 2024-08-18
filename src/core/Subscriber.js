import isEqual from 'lodash.isequal';

/* eslint-disable import/prefer-default-export */
export class Subscriber {
  constructor(store) {
    this.store = store;
    this.sub = null;
    this.prevState = null;
  }

  subscribeComponents(components = []) {
    this.prevState = this.store.getState();

    const componentsWithWatchers = components
      .filter((component) => component.watchers);

    this.sub = this.store.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        const value = state[key];
        const prevValue = this.prevState[key];

        if (!isEqual(prevValue, value)) {
          componentsWithWatchers.forEach((component) => {
            component.watchers[key]?.call(component, value, prevValue);
          });
        }
      });

      this.prevState = this.store.getState();
    });
  }

  unsubscribeAll() {
    this.sub.unsubscribe();
  }
}
