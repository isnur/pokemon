import * as actionTypes from '../actions/actionTypes';

const initialState = {
  pokemonList: [],
  loadmore: false,
  busy: false,
  nextUrl: null
};

const reducer = (state = initialState, action) => {
  const pokemonList = state.pokemonList ? state.pokemonList : [];
  switch (action.type) {
    case actionTypes.RESET_POKEMON: return {
      ...state,
      pokemonList: []
    };
    case actionTypes.LOAD_MORE: return {
      ...state,
      loadmore: action.loadmore
    };
    case actionTypes.IS_BUSY: return {
      ...state,
      busy: action.busy
    };
    case actionTypes.NEXT_URL: return {
      ...state,
      nextUrl: action.nextUrl
    };
    case actionTypes.GET_POKEMON: return {
      ...state,
      pokemonList: [...pokemonList, ...action.pokemonList]
    };
    default:
      return state;
  }
};

export default reducer;