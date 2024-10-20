import { defaultTitle } from './title';

/* eslint-disable import/prefer-default-export */
export const initState = {
  lastChange: new Date().toJSON(),
  title: defaultTitle,
};
