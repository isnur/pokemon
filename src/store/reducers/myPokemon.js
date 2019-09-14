import * as actionTypes from '../actions/actionTypes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_MY_POKEMON:
      return [
        ...state,
        ...action.myPokemon
      ];
    case actionTypes.DELETE_MY_POKEMON:
      const updateMyPokemon = state.filter(obj => {
        return obj.id !== action.id;
      });
      return [
        ...updateMyPokemon
      ];
    case actionTypes.GET_MY_POKEMON:
      return [
        ...state,
        ...action.myPokemon
      ];
    default:
      return state;
  }
};

export default reducer;