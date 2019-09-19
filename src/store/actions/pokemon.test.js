import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import * as actions from './pokemon';
import * as types from './actionTypes';

const axiosMock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('pokemon actions', () => {
  afterEach(() => {
    axiosMock.reset();
  })

  it("should make an http request for get pokemon list", () => {
    const uri = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=25';
    const getResponse = {
      "count": 964,
      "next": "https://pokeapi.co/api/v2/pokemon/?offset=25&limit=25",
      "previous": null,
      "results": [{ "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" }]
    }
    axiosMock.onGet(uri).reply(200, getResponse);

    const expectedActions = [
      { "type": types.IS_BUSY, "busy": true },
      { "type": types.IS_BUSY, "busy": false },
      { "type": types.NEXT_URL, "nextUrl": "https://pokeapi.co/api/v2/pokemon/?offset=25&limit=25" },
      {
        "type": types.GET_POKEMON,
        "pokemonList": [{ "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" }]
      }
    ];

    const store = mockStore({});

    store.dispatch(actions.getPokemon(uri, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should make an http request for get pokemon list when click `load more` button", () => {
    const uri = 'https://pokeapi.co/api/v2/pokemon/?offset=25&limit=25';
    const getResponse = {
      "count": 964,
      "next": "https://pokeapi.co/api/v2/pokemon/?offset=50&limit=25",
      "previous": "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=25",
      "results": [{ "name": "raichu", "url": "https://pokeapi.co/api/v2/pokemon/26/" }]
    }
    axiosMock.onGet(uri).reply(200, getResponse);

    const expectedActions = [
      { "type": types.LOAD_MORE, "loadmore": true },
      { "type": types.LOAD_MORE, "loadmore": false },
      { "type": types.NEXT_URL, "nextUrl": "https://pokeapi.co/api/v2/pokemon/?offset=50&limit=25" },
      {
        "type": types.GET_POKEMON,
        "pokemonList": [{ "name": "raichu", "url": "https://pokeapi.co/api/v2/pokemon/26/" }]
      }
    ];

    const store = mockStore({});

    store.dispatch(actions.getPokemon(uri, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
})