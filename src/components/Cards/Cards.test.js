import React from 'react';

import { shallow } from 'enzyme';

import Cards from './Cards';
import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';
import Loadmore from '../Loadmore/Loadmore';

describe('<Cards />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Cards />);
  });

  it('should render an `.cards`', () => {
    expect(wrapper.find('.cards')).toHaveLength(1);
  });

  it('should an exact loading spinner', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.contains(<Spinner radius="10" strokeWidth="1" color="#03ac0e" />)).toEqual(true);
  });

  it('should an exact No data', () => {
    expect(wrapper.contains(<p>No data</p>)).toEqual(true);
  });

  it('should render 2 <Card /> elements', () => {
    const items = [
      { "name": "bulbasaur", "url": "https://pokeapi.co/api/v2/pokemon/1/" },
      { "name": "ivysaur", "url": "https://pokeapi.co/api/v2/pokemon/2/" }
    ];
    wrapper.setProps({ items: items });
    expect(wrapper.find(Card)).toHaveLength(2);
  });

  it('should render children', () => {
    wrapper.setProps({ children: <Loadmore /> });
    expect(wrapper.contains(<Loadmore />)).toEqual(true);
  });
});