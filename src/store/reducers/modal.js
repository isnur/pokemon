import * as actionTypes from '../actions/actionTypes';

const initialState = {
  status: false,
  action: {
    cancel: null,
    submit: null
  },
  content: false,
  clickToClose: false,
  errorMsg: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_MODAL: return {
      ...state,
      ...action.modal
    };
    default:
      return state;
  }
};

export default reducer;