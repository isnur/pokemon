import * as actionTypes from '../actions/actionTypes';

const initialState = {
  srcLogo: '/images/pokemon.png',
  altLogo: 'Pokemon Logo',
  heightLogo: 42,
  title: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TOOLBAR: return {
      ...state,
      ...action.toolbar
    };
    default:
      return state;
  }
};

export default reducer;