import reducer from './pokemon';
import * as types from '../actions/actionTypes';

describe('pokemon reducer', () => {
  const initialState = {
    pokemonList: [],
    loadmore: false,
    busy: false,
    nextUrl: null
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle GET_POKEMON', () => {
    expect(
      reducer(initialState, {
        type: types.GET_POKEMON,
        pokemonList: [{ "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" }]
      })
    ).toEqual({
      pokemonList: [{ "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" }],
      loadmore: false,
      busy: false,
      nextUrl: null
    })
  })

  it('should handle RESET_POKEMON', () => {
    expect(
      reducer(initialState, {
        type: types.RESET_POKEMON
      })
    ).toEqual({
      pokemonList: [],
      loadmore: false,
      busy: false,
      nextUrl: null
    })
  })

  it('should handle LOAD_MORE', () => {
    expect(
      reducer(initialState, {
        type: types.LOAD_MORE,
        loadmore: true
      })
    ).toEqual({
      pokemonList: [],
      loadmore: true,
      busy: false,
      nextUrl: null
    })
  })

  it('should handle IS_BUSY', () => {
    expect(
      reducer(initialState, {
        type: types.IS_BUSY,
        busy: true
      })
    ).toEqual({
      pokemonList: [],
      loadmore: false,
      busy: true,
      nextUrl: null
    })
  })

  it('should handle NEXT_URL', () => {
    expect(
      reducer(initialState, {
        type: types.NEXT_URL,
        nextUrl: "https://pokeapi.co/api/v2/pokemon/?offset=25&limit=25"
      })
    ).toEqual({
      pokemonList: [],
      loadmore: false,
      busy: false,
      nextUrl: "https://pokeapi.co/api/v2/pokemon/?offset=25&limit=25"
    })
  })
})