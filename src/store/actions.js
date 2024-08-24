import * as types from './actionsTypes';
/* eslint-disable import/prefer-default-export */
export function tableResize(data) {
  return {
    type: types.TABLE_RESIZE,
    data,
  };
}

export function changeText(data) {
  return {
    type: types.CHANGE_TEXT,
    data,
  };
}

export function applyStyle(data) {
  return {
    type: types.APPLY_STYLE,
    data,
  };
}
