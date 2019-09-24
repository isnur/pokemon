import axios from 'axios';
import * as actionTypes from './actionTypes';

export const deleteMyPokemon = (id) => {
  return {
    type: actionTypes.DELETE_MY_POKEMON,
    id: id
  };
};

export const addMyPokemon = (pokemon) => {
  return {
    type: actionTypes.ADD_MY_POKEMON,
    myPokemonList: [pokemon]
  };
};

export const setLoading = (value) => {
  return {
    type: actionTypes.IS_LOADING,
    loading: value
  };
};

export const fetchPokemonDetailSuccess = (results) => {
  return {
    type: actionTypes.POKEMON_DETAIL,
    pokemonDetail: results
  };
};

export const setPokemon = (pokemon) => {
  return {
    type: actionTypes.POKEMON,
    selectedPokemon: pokemon
  };
};

export const setErrorMsg = (e) => {
  return {
    type: actionTypes.ERROR_MSG,
    pokemonDetail: null,
    errorMsg: e.response ? e.response.data : 'Error loading data'
  };
};

export const getPokemonDetail = (url, id) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(url);
      dispatch(setLoading(false));
      dispatch(setPokemon({
        id: id,
        url: url,
        name: response.data.name
      }));
      dispatch(fetchPokemonDetailSuccess(response.data));
    }
    catch (e) {
      dispatch(setErrorMsg(e));
      dispatch(setLoading(false));
    }
  };
};
