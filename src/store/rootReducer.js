import { unnamedTitle } from '@const/title';
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
        lastChange: new Date().toJSON(),
      };
    case types.CHANGE_TEXT:
      assister = state.cellState?.[data.id] ?? {};
      assister.value = data.value;
      return {
        ...state,
        lastInputValue: data.value ?? '',
        cellState: { ...state.cellState, [data.id]: assister },
        lastChange: new Date().toJSON(),
      };
    case types.APPLY_VALUE:
      assister = data.ids?.reduce((acc, id) => {
        const cell = state.cellState?.[id] ?? {};
        cell.value = data.value;
        acc[id] = cell;
        return acc;
      }, {});

      return {
        ...state,
        lastInputValue: data.value ?? '',
        cellState: { ...state.cellState, ...assister },
        lastChange: new Date().toJSON(),
      };
    case types.APPLY_STYLES:
      assister = data.ids?.reduce((acc, id) => {
        const cell = state.cellState?.[id] ?? {};
        cell.styles = { ...cell.styles, ...data.styles };
        acc[id] = cell;
        return acc;
      }, {});

      return {
        ...state,
        cellState: { ...state.cellState, ...assister },
        lastChange: new Date().toJSON(),
      };
    case types.CHANGE_TITLE:
      return {
        ...state,
        title: data.title || unnamedTitle,
        lastChange: new Date().toJSON(),
      };
    case types.UPDATE_LAST_CHANGE:
      return { ...state, lastChange: new Date().toJSON() };
    default:
      return state;
  }
}
