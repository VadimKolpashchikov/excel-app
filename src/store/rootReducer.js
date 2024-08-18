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
    case types.CHANGE_TEXT:
      return {
        ...state,
        currentText: data.text,
        cellState: { ...state.cellState, [data.id]: data.text },
      };
    default:
      return state;
  }
}
