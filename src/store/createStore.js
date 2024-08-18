import cloneDeep from 'lodash.clonedeep';

/* eslint-disable import/prefer-default-export */
export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({ ...initialState }, { type: '__INIT__' });
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn);

      return {
        unsubscribe() {
          listeners = listeners.filter((listener) => listener !== fn);
        },
      };
    },
    dispatch(action) {
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    getState(...args) {
      const cloneState = cloneDeep(state);
      if (args.length === 1) {
        return cloneState[args[0]];
      }
      if (args.length > 1) {
        return args.reduce((acc, arg) => {
          acc[arg] = cloneState[arg];
          return acc;
        }, {});
      }
      return cloneState;
    },
  };
}
