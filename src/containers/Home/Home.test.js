import React from 'react';

import { shallow } from 'enzyme';

import { Home } from './Home';

describe('<Home />', () => {
  let wrapper;

  beforeEach(() => {
    const pokemonList = [];
    const mock = jest.fn();
    wrapper = shallow(<Home
      onUpdateToolbar={mock}
      pokemonList={pokemonList}
      onGetPokemon={mock} />);
  });

  it('should render <Home />', () => {
    const content = wrapper.find('.content__header');
    expect(content.text()).toEqual('Pokemon List');
  });
});