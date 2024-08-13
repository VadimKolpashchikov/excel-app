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
      if (args.length > 1) {
        return args.reduce((acc, arg) => {
          acc[arg] = state[arg];
          return acc;
        }, {});
      } if (args.length === 1) {
        return state[args[0]];
      }
      return state;
    },
  };
}
