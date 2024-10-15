import { defaultTitle } from './title';

/* eslint-disable import/prefer-default-export */
export const initState = {
  lastLogin: new Date().toJSON(),
  title: defaultTitle,
};
