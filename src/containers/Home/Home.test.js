import React from 'react';

import { shallow } from 'enzyme';

import { Home } from './Home';

describe('<Home />', () => {
  let wrapper;

  beforeEach(() => {
    const pokemonList = [];
    wrapper = shallow(<Home
      onUpdateToolbar={() => {}}
      pokemonList={pokemonList}
      onGetPokemon={() => {}} />);
  });

  it('should render <Home />', () => {
    const content = wrapper.find('.content__header');
    expect(content.text()).toEqual('Pokemon List');
  });
});