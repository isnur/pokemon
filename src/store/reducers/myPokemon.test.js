import reducer from './myPokemon';
import * as types from '../actions/actionTypes';

describe('myPokemon reducer', () => {
  const initialState = {
    myPokemonList: [],
    pokemonDetail: null,
    loading: true,
    selectedPokemon: {},
    errorMsg: ''
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle IS_LOADING', () => {
    expect(
      reducer(initialState, {
        type: types.IS_LOADING,
        loading: false
      })
    ).toEqual({
      myPokemonList: [],
      pokemonDetail: null,
      loading: false,
      selectedPokemon: {},
      errorMsg: ''
    })
  })

  it('should handle ERROR_MSG', () => {
    expect(
      reducer({ ...initialState, loading: false }, {
        type: types.ERROR_MSG,
        errorMsg: 'Not found'
      })
    ).toEqual({
      myPokemonList: [],
      pokemonDetail: null,
      loading: false,
      selectedPokemon: {},
      errorMsg: 'Not found'
    })
  })

  it('should handle ADD_MY_POKEMON', () => {
    expect(
      reducer(initialState, {
        type: types.ADD_MY_POKEMON,
        myPokemonList: [{ "id": 1, "name": "bulbasaur", "nickname": "Pokemon 1", "url": "https://pokeapi.co/api/v2/pokemon/1/" }]
      })
    ).toEqual({
      myPokemonList: [{ "id": 1, "name": "bulbasaur", "nickname": "Pokemon 1", "url": "https://pokeapi.co/api/v2/pokemon/1/" }],
      pokemonDetail: null,
      loading: true,
      selectedPokemon: {},
      errorMsg: ''
    })
  })

  it('should handle DELETE_MY_POKEMON', () => {
    const myPokemonList = [
      { "id": 1, "name": "bulbasaur", "nickname": "Pokemon 1", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
      { "id": 2, "name": "ivysaur", "nickname": "Pokemon 2", "url": "https://pokeapi.co/api/v2/pokemon/2/" }
    ]
    expect(
      reducer({
        ...initialState,
        myPokemonList
      }, {
        type: types.DELETE_MY_POKEMON,
        id: 1
      })
    ).toEqual({
      myPokemonList: [{ "id": 2, "name": "ivysaur", "nickname": "Pokemon 2", "url": "https://pokeapi.co/api/v2/pokemon/2/" }],
      pokemonDetail: null,
      loading: true,
      selectedPokemon: {},
      errorMsg: ''
    })
  })

  it('should handle POKEMON_DETAIL', () => {
    const pokemonDetail = {
      "height": 7,
      "id": 1,
      "moves": [
        {
          "move": {
            "name": "razor-wind",
            "url": "https://pokeapi.co/api/v2/move/13/"
          }
        }
      ],
      "name": "bulbasaur",
      "sprites": {
        "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
      },
      "types": [
        {
          "slot": 2,
          "type": {
            "name": "poison",
            "url": "https://pokeapi.co/api/v2/type/4/"
          }
        },
        {
          "slot": 1,
          "type": {
            "name": "grass",
            "url": "https://pokeapi.co/api/v2/type/12/"
          }
        }
      ],
      "weight": 69
    }
    expect(
      reducer({
        ...initialState,
        pokemonDetail: pokemonDetail
      }, {
        type: types.POKEMON_DETAIL,
        pokemonDetail: pokemonDetail
      })
    ).toEqual({
      myPokemonList: [],
      pokemonDetail: pokemonDetail,
      loading: true,
      selectedPokemon: {},
      errorMsg: ''
    })
  })

  it('should handle POKEMON', () => {
    expect(
      reducer(initialState, {
        type: types.POKEMON,
        selectedPokemon: { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" }
      })
    ).toEqual({
      myPokemonList: [],
      pokemonDetail: null,
      loading: true,
      selectedPokemon: { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
      errorMsg: ''
    })
  })

})