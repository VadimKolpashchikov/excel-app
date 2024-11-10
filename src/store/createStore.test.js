import { createStore } from '.';

let store;
let handler;

const reducer = (state, action = {}) => {
  if (action.type === 'ADD') {
    return { ...state, count: state.count + 1 };
  }

  return state;
};

const initialState = {
  count: 0,
};

describe('store', () => {
  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });

  test('should be object with three methods', () => {
    const { dispatch, getState, subscribe } = store;

    expect(store).toBeDefined();
    expect(store).toBeInstanceOf(Object);
    expect(dispatch).toBeDefined();
    expect(getState).toBeDefined();
    expect(subscribe).toBeDefined();
  });

  test('should return initialState object when calling method getState', () => {
    const state = store.getState();

    expect(state).toBeInstanceOf(Object);
    expect(state).toEqual(initialState);
  });

  test('should change state when calling method dispatch with appropriate type', () => {
    const initialCount = store.getState().count;
    store.dispatch({ type: 'ADD' });

    expect(store.getState().count).toBe(initialCount + 1);
  });

  test('should not change state when calling method dispatch with wrong type', () => {
    const stateUnderTest = store.getState();
    store.dispatch({ type: 'WRONG_TYPE' });

    expect(store.getState()).toStrictEqual(stateUnderTest);
  });

  test('should call subscriber`s methods when call method dispatch', () => {
    store.subscribe(handler);
    store.dispatch({ type: 'ADD' });
    store.dispatch({ type: 'WRONG_TYPE' });

    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenCalledWith(store.getState());
  });

  test('should not call subscriber`s method if method is unsubscribed', () => {
    const subscription = store.subscribe(handler);
    subscription.unsubscribe();

    store.dispatch({ type: 'ADD' });
    expect(handler).not.toHaveBeenCalled();
  });

  test('should dispatch in async way', () => new Promise((resolve) => {
    const initialCount = store.getState().count;

    setTimeout(() => {
      store.dispatch({ type: 'ADD' });
    }, 500);

    setTimeout(() => {
      expect(store.getState().count).toBe(initialCount + 1);
      resolve();
    }, 600);
  }));
});
