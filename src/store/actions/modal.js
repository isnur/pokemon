import * as actionTypes from './actionTypes';

export const updateModal = (modal) => {
  return {
    type: actionTypes.UPDATE_MODAL,
    modal: modal
  };
};
