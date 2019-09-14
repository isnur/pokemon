import * as actionTypes from './actionTypes';

export const updateToolbar = (toolbar) => {
  return {
    type: actionTypes.UPDATE_TOOLBAR,
    toolbar: toolbar
  };
};
