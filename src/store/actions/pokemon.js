import axios from 'axios';

import * as actionTypes from './actionTypes';

export const resetPokemon = () => {
  return {
    type: actionTypes.RESET_POKEMON
  };
};

export const loadMore = (value) => {
  return {
    type: actionTypes.LOAD_MORE,
    loadmore: value
  };
};

export const isBusy = (value) => {
  return {
    type: actionTypes.IS_BUSY,
    busy: value
  };
};

export const nextUrl = (value) => {
  return {
    type: actionTypes.NEXT_URL,
    nextUrl: value
  };
};

export const setLoading = (firstLoad, value) => {
  if (firstLoad) {
    return dispatch => {
      dispatch(isBusy(value));
    };
  }
  return dispatch => {
    dispatch(loadMore(value));
  };
};

export const fetchPokemonSuccess = (results) => {
  return {
    type: actionTypes.GET_POKEMON,
    pokemonList: results
  };
};

export const getPokemon = (url, firstLoad) => {
  return async dispatch => {
    dispatch(setLoading(firstLoad, true));
    try {
      const response = await axios.get(url);
      dispatch(setLoading(firstLoad, false));
      dispatch(nextUrl(response.data.next ? response.data.next : null));
      dispatch(fetchPokemonSuccess(response.data.results));
    }
    catch (e) {
      dispatch(setLoading(firstLoad, false));
    }
  };
};