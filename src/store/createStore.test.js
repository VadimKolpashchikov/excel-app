import { createStore } from '.';

describe('test', () => {
  test('test', () => {
    const store = createStore(() => {}, {});
    expect(store).toBeDefined();
  });
});
