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
    myPokemon: [pokemon]
  };
};

export const getMyPokemon = (myPokemon) => {
  return {
    type: actionTypes.GET_MY_POKEMON,
    myPokemon: myPokemon
  };
};
