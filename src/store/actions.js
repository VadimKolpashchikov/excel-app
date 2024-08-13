import * as types from './actionsTypes';
/* eslint-disable import/prefer-default-export */
export function tableResize(data) {
  return {
    type: types.TABLE_RESIZE,
    data,
  };
}

export function tableInput(data) {
  return {
    type: types.TABLE_INPUT,
    data,
  };
}
