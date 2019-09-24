import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { shallow, mount } from 'enzyme';

import { MyPokemon } from './MyPokemon';
import { mapStateToProps } from './selectors';
import { mapDispatchToProps } from './actionCreators';
import * as actionTypes from '../../store/actions/actionTypes';

describe('<MyPokemon />', () => {
  let wrapper;

  beforeEach(() => {
    const myPokemonList = [];
    const mock = jest.fn();
    wrapper = shallow(<MyPokemon
      onUpdateToolbar={mock}
      myPokemon={myPokemonList} />);
  });

  it('should render <MyPokemon />', () => {
    const content = wrapper.find('.content__header h1');
    expect(content.text()).toEqual('My Pokemon List');
  });

  it('should show No data', () => {
    const myPokemonList = [];
    const mock = jest.fn();
    wrapper = mount(<MyPokemon
      onUpdateToolbar={mock}
      myPokemon={myPokemonList} />);
    const content = wrapper.find('cards');
    expect(content.text()).toEqual('No data');
    wrapper.unmount();
  });

  it('should render 2 <card />', () => {
    const myPokemonList = [{ "id": 1, "name": "bulbasaur", "nickname": "Pokemon 1", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
    { "id": 2, "name": "ivysaur", "nickname": "Pokemon 2", "url": "https://pokeapi.co/api/v2/pokemon/2/" }];
    const mock = jest.fn();
    wrapper = mount(<Router><MyPokemon
      onUpdateToolbar={mock}
      myPokemon={myPokemonList} /></Router>);
    expect(wrapper.find('card')).toHaveLength(myPokemonList.length);
    wrapper.unmount();
  });

  it('should create an props from state', () => {
    const state = {
      toolbar: { srcLogo: '/images/pokemon.png', altLogo: 'Pokemon Logo' },
      myPokemon: [{ "id": 2, "name": "ivysaur", "nickname": "Pokemon 2", "url": "https://pokeapi.co/api/v2/pokemon/2/" }]
    }
    const expectedProps = {
      toolbar: state.toolbar,
      myPokemon: state.myPokemon.myPokemonList
    }
    expect(mapStateToProps(state)).toEqual(expectedProps)
  })

  it('should remove the pokemon when button is clicked', () => {
    const dispatch = jest.fn();

    mapDispatchToProps(dispatch).onRemove(1);
    expect(dispatch.mock.calls[0][0]).toEqual({ type: actionTypes.DELETE_MY_POKEMON, id: 1 });
  });

  it('should update the toolbar', () => {
    const dispatch = jest.fn();
    const toolbar = { srcLogo: '/images/pokemon.png', altLogo: 'Pokemon Logo' };

    mapDispatchToProps(dispatch).onUpdateToolbar(toolbar);
    expect(dispatch.mock.calls[0][0]).toEqual({ type: actionTypes.UPDATE_TOOLBAR, toolbar: toolbar });
  });

  it('should call mock function on button click', () => {
    const myPokemonList = [{ "id": 1, "name": "bulbasaur", "nickname": "Pokemon 1", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
    { "id": 2, "name": "ivysaur", "nickname": "Pokemon 2", "url": "https://pokeapi.co/api/v2/pokemon/2/" }];
    const mock = jest.fn();
    wrapper = mount(<Router><MyPokemon
      onUpdateToolbar={mock}
      onRemove={mock}
      myPokemon={myPokemonList} /></Router>);
    wrapper.find('.card__content--delete').at(0).simulate('click');
    expect(mock).toHaveBeenCalled();

    wrapper.unmount();
  });
});