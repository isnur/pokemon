import * as actionTypes from '../actions/actionTypes';

const initialState = {
  myPokemonList: [],
  pokemonDetail: null,
  loading: true,
  selectedPokemon: {},
  errorMsg: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MY_POKEMON:
      return { ...state, myPokemonList: [...state.myPokemonList, ...action.myPokemonList] };
    case actionTypes.DELETE_MY_POKEMON:
      const updateMyPokemon = state.myPokemonList.filter(obj => {
        return obj.id !== action.id;
      });
      return { ...state, myPokemonList: updateMyPokemon };
    case actionTypes.POKEMON_DETAIL:
      return { ...state, pokemonDetail: action.pokemonDetail };
    case actionTypes.POKEMON:
      return { ...state, selectedPokemon: action.selectedPokemon };
    case actionTypes.IS_LOADING:
      return { ...state, loading: action.loading };
    case actionTypes.ERROR_MSG:
      return { ...state, errorMsg: action.errorMsg, pokemonDetail: null };
    default:
      return state;
  }
};

export default reducer;