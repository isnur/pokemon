import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import * as actions from './myPokemon';
import * as types from './actionTypes';

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('my pokemon actions', () => {
  afterEach(() => {
    axiosMock.reset();
  })

  it("should make an http request for get pokemon detail", () => {
    const uri = 'https://pokeapi.co/api/v2/pokemon/1/';

    const pokemonDetail = {
      id: 1,
      name: "bulbasaur",
      moves: [{
        move: {
          name: "razor-wind",
          url: "https://pokeapi.co/api/v2/move/13/"
        }
      }],
      types: [{
        "slot": 2,
        "type": { "name": "poison", "url": "https://pokeapi.co/api/v2/type/4/" }
      }, {
        "slot": 1,
        "type": { "name": "grass", "url": "https://pokeapi.co/api/v2/type/12/" }
      }],
      sprites: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
      },
      height: 7,
      weight: 69
    }
    axiosMock.onGet(uri).reply(200, pokemonDetail);

    const expectedActions = [
      {
        "loading": true,
        "type": types.IS_LOADING
      },
      {
        "loading": false,
        "type": types.IS_LOADING
      },
      {
        "selectedPokemon": {
          "id": 1,
          "name": "bulbasaur",
          "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        "type": types.POKEMON
      },
      {
        "pokemonDetail": {
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
        },
        "type": types.POKEMON_DETAIL
      }
    ];

    const store = mockStore({});

    store.dispatch(actions.getPokemonDetail(uri, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should make an http request error", () => {
    const uri = 'https://pokeapi.co/api/v2/pokemon/1000/';

    axiosMock.onGet(uri).reply(404, 'Not found');

    const expectedActions = [
      {
        "loading": true,
        "type": types.IS_LOADING
      },
      {
        "errorMsg": "Not found",
        "pokemonDetail": null,
        "type": types.ERROR_MSG
      },
      {
        "loading": false,
        "type": types.IS_LOADING
      }
    ];

    const store = mockStore({});
    store.dispatch(actions.getPokemonDetail(uri, 1000)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should make an http request error when offline", () => {
    const uri = 'https://pokeapi.co/api/v2/pokemon/1/';

    axiosMock.onGet(uri).reply(106, 'Error loading data');

    const expectedActions = [
      {
        "loading": true,
        "type": types.IS_LOADING
      },
      {
        "errorMsg": "Error loading data",
        "pokemonDetail": null,
        "type": types.ERROR_MSG
      },
      {
        "loading": false,
        "type": types.IS_LOADING
      }
    ];

    const store = mockStore({});
    store.dispatch(actions.getPokemonDetail(uri, 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should create an action to delete my pokemon', () => {
    const expectedAction = {
      type: types.DELETE_MY_POKEMON,
      id: 1
    }
    expect(actions.deleteMyPokemon(1)).toEqual(expectedAction)
  })

  it('should create an action to add my pokemon', () => {
    const pokemon = { "id": 2, "name": "ivysaur", "nickname": "Pokemon 2", "url": "https://pokeapi.co/api/v2/pokemon/2/" }
    const expectedAction = {
      type: types.ADD_MY_POKEMON,
      myPokemonList: [pokemon]
    }
    expect(actions.addMyPokemon(pokemon)).toEqual(expectedAction)
  })

  it('should create an action to set error message', () => {
    const error = { response: { data: 'Not found' } }
    const expectedAction = {
      type: types.ERROR_MSG,
      errorMsg: error.response.data,
      pokemonDetail: null
    }
    expect(actions.setErrorMsg(error)).toEqual(expectedAction)
  })

  it('should create an action to set error message when offline', () => {
    const error = { response: null }
    const expectedAction = {
      type: types.ERROR_MSG,
      errorMsg: 'Error loading data',
      pokemonDetail: null
    }
    expect(actions.setErrorMsg(error)).toEqual(expectedAction)
  })
})