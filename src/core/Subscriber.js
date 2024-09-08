import isEqual from 'lodash.isequal';

/* eslint-disable import/prefer-default-export */
export class Subscriber {
  constructor(store) {
    this.$store = store;
    this.sub = null;
    this.prevState = null;
  }

  subscribeComponents(components = []) {
    this.prevState = this.$store.getState();

    const [componentsWithWatchers, watchersKeys] = components
      .reduce((acc, component) => {
        if (component.watchers) {
          acc[0].push(component);
          acc[1].push(...Object.keys(component.watchers));
        }

        return acc;
      }, [[], []]);

    const keys = [...new Set(watchersKeys)];

    this.sub = this.$store.subscribe((state) => {
      keys.forEach((key) => {
        const value = state[key];
        const prevValue = this.prevState[key];

        if (!isEqual(prevValue, value)) {
          componentsWithWatchers.forEach((component) => {
            component.watchers[key]?.call(component, value, prevValue);
          });
        }
      });

      this.prevState = this.$store.getState();
    });
  }

  unsubscribeAll() {
    this.sub.unsubscribe();
  }
}
