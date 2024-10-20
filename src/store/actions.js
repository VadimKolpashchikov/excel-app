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

export function applyStyles(data) {
  return {
    type: types.APPLY_STYLES,
    data,
  };
}

export function applyValue(data) {
  return {
    type: types.APPLY_VALUE,
    data,
  };
}

export function changeTitle(data) {
  return {
    type: types.CHANGE_TITLE,
    data,
  };
}

export function updateLastChange() {
  return {
    type: types.UPDATE_LAST_CHANGE,
  };
}
