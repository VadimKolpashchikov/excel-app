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
      assister = state.cellState?.[data.id] ?? {};
      assister.text = data.text;
      return {
        ...state,
        currentText: data.text,
        cellState: { ...state.cellState, [data.id]: assister },
      };
    case types.APPLY_STYLE:
      assister = state.cellState?.[data.id] ?? {};
      assister.styles = { ...assister.styles, ...data.styles };
      return {
        ...state,
        cellState: { ...state.cellState, [data.id]: assister },
      };
    default:
      return state;
  }
}
