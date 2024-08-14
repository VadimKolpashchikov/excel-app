import * as types from './actionsTypes';
/* eslint-disable import/prefer-default-export */
export function rootReducer(state, { type, data = {} }) {
  let assister;
  switch (type) {
    case types.TABLE_RESIZE:
      assister = `${data.type}State`;
      return {
        ...state,
        [assister]: {
          ...state[assister],
          [data.id]: data.value,
        },
      };
    case types.TABLE_INPUT:
      return { ...state, cellState: { ...state.cellState, ...data } };
    default:
      return state;
  }
}
