import React from 'react';

import { shallow, mount } from 'enzyme';

import { Detail } from './Detail';
import Spinner from '../../components/Spinner/Spinner';
import { mapStateToProps } from './selectors';
import { mapDispatchToProps } from './actionCreators';
import * as actionTypes from '../../store/actions/actionTypes';

describe('<Detail />', () => {
  let wrapper;
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

  beforeEach(() => {
    const mock = jest.fn();
    const location = { pathname: '/detail' };
    const history = [];
    wrapper = shallow(<Detail
      location={location}
      history={history}
      onUpdateToolbar={mock}
      onGetPokemonDetail={mock}
      onUpdateModal={mock} />);
  });

  it('should render <Detail />', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.contains(<Spinner radius="10" strokeWidth="1" color="#03ac0e" />)).toEqual(true);
  });

  it('should show error message', () => {
    wrapper.setProps({ loading: false, errorMsg: 'Not found' });
    wrapper.instance().getImage();
    expect(wrapper.text()).toEqual("Not found");
  });

  it('should show pokemon detail', () => {
    wrapper.setProps({
      loading: false,
      pokemonDetail: pokemonDetail
    });
    const content = wrapper.find('.content__header');
    wrapper.instance().getImage();
    expect(content.text()).toEqual("Bulbasaur");
  });

  it('should called catchPokemon when click catch the pokemon button', () => {
    const mock = jest.fn();
    wrapper.setProps({
      onUpdateModal: mock,
      onCatchPokemon: mock,
      loading: false,
      pokemonDetail: pokemonDetail
    });
    const content = wrapper.find('.content__button');
    content.simulate('click');
    wrapper.instance().openModal();
    wrapper.instance().openModal(true);
    expect(mock).toHaveBeenCalled();
  });

  it('should show pokemon nickname', () => {
    wrapper.setProps({
      myPokemon: [{
        id: 1,
        name: "bulbasaur",
        nickname: "My nickname",
        url: "https://pokeapi.co/api/v2/pokemon/1/"
      }],
      loading: false,
      selectedPokemon: {
        id: 1,
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/"
      },
      pokemonDetail: pokemonDetail
    });
    const content = wrapper.find('.content__header');
    expect(content.text()).toEqual("Bulbasaur (My Nickname)");
  });

  it('should save pokemon nickname', () => {
    const mock = jest.fn();
    const location = { pathname: '/detail' };
    const history = [];
    wrapper = mount(<Detail
      location={location}
      history={history}
      onUpdateToolbar={mock}
      onGetPokemonDetail={mock}
      onUpdateModal={mock} />);
    wrapper.setProps({
      onCatchPokemon: mock,
      myPokemon: [],
      loading: false,
      selectedPokemon: {
        id: 1,
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/"
      },
      pokemonDetail: pokemonDetail
    });
    wrapper.instance().catchPokemon();
    wrapper.instance().saveNickname('');
    wrapper.instance().saveNickname('My nickname');
    wrapper.unmount();
  });

  it('should create an props from state', () => {
    const state = {
      modal: {},
      myPokemon: {
        errorMsg: '',
        loading: true,
        myPokemonList: [{ "id": 2, "name": "ivysaur", "nickname": "Pokemon 2", "url": "https://pokeapi.co/api/v2/pokemon/2/" }],
        pokemonDetail: null,
        selectedPokemon: {}
      }
    }
    const expectedProps = {
      errorMsg: state.myPokemon.errorMsg,
      modal: state.modal,
      loading: state.myPokemon.loading,
      myPokemon: state.myPokemon.myPokemonList,
      pokemonDetail: state.myPokemon.pokemonDetail,
      selectedPokemon: state.myPokemon.selectedPokemon
    }
    expect(mapStateToProps(state)).toEqual(expectedProps)
  })

  it('should update the toolbar', () => {
    const dispatch = jest.fn();
    const toolbar = {
      srcLogo: '/images/back.png',
      altLogo: 'Back',
      title: 'Pokemon Detail'
    };
    mapDispatchToProps(dispatch).onUpdateToolbar(toolbar);
    expect(dispatch.mock.calls[0][0]).toEqual({ type: actionTypes.UPDATE_TOOLBAR, toolbar: toolbar });
  });

  it('should update modal', () => {
    const dispatch = jest.fn();
    const modal = {
      status: false
    };
    mapDispatchToProps(dispatch).onUpdateModal(modal);
    expect(dispatch.mock.calls[0][0]).toEqual({ type: actionTypes.UPDATE_MODAL, modal: modal });
  });

  it('should add to my pokemon', () => {
    const dispatch = jest.fn();
    const pokemon = { "id": 2, "name": "ivysaur", "nickname": "Pokemon 2", "url": "https://pokeapi.co/api/v2/pokemon/2/" };
    mapDispatchToProps(dispatch).onCatchPokemon(pokemon);
    expect(dispatch.mock.calls[0][0]).toEqual({ type: actionTypes.ADD_MY_POKEMON, myPokemonList: [pokemon] });
  });

  it('should get pokemon detail', async () => {
    const dispatch = jest.fn();
    const asyncMock = jest.fn().mockImplementation(() => {
      return {type: actionTypes.POKEMON_DETAIL, pokemonDetail: pokemonDetail}
    })
    const res = await asyncMock();
    
    mapDispatchToProps(dispatch).onGetPokemonDetail('https://pokeapi.co/api/v2/pokemon/1/', 1);
    expect(pokemonDetail).toEqual(res.pokemonDetail);
  });
});