import * as actionTypes from './actions';

const initialState = {
  toolbar: {
    srcLogo: '/images/pokemon.png',
    altLogo: 'Pokemon Logo',
    heightLogo: 42,
    title: ''
  },
  myPokemon: [],
  pokemonList: [],
  modal: {
    status: false,
    action: {
      cancel: null,
      submit: null
    },
    content: false,
    clickToClose: false,
    errorMsg: ''
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_TOOLBAR:
      return {
        ...state,
        toolbar: action.toolbar
      };
    case actionTypes.GET_POKEMON:
      return {
        ...state,
        pokemonList: [...state.pokemonList, ...action.pokemonList]
      };
    case actionTypes.RESET_POKEMON:
      return {
        ...state,
        pokemonList: []
      };
    case actionTypes.ADD_MY_POKEMON:
      return {
        ...state,
        myPokemon: [...state.myPokemon, ...action.myPokemon]
      };
    case actionTypes.DELETE_MY_POKEMON:
      const updateMyPokemon = state.myPokemon.filter(obj => {
        return obj.id !== action.id;
      });
      return {
        ...state,
        myPokemon: updateMyPokemon
      };
    case actionTypes.GET_MY_POKEMON:
      return {
        ...state,
        myPokemon: action.myPokemon
      };
    case actionTypes.UPDATE_MODAL:
      return {
        ...state,
        modal: action.modal
      };
    default:
      return state;
  }
};

export default reducer;