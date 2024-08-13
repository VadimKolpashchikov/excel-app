import * as types from './actionsTypes';
/* eslint-disable import/prefer-default-export */
export function rootReducer(state, action) {
  switch (action.type) {
    case types.TABLE_RESIZE:
      return { ...state, colState: { ...state.colState, ...action.data } };
    case types.TABLE_INPUT:
      return { ...state, cellState: { ...state.cellState, ...action.data } };
    default:
      return state;
  }
}
