import React from 'react';

import { shallow } from 'enzyme';

import Toolbar from './Toolbar';

describe('<Toolbar />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Toolbar />);
  });

  it('should render an `.toolbar`', () => {
    expect(wrapper.find('.toolbar')).toHaveLength(1);
  });

  it('should an exact toolbar image', () => {
    wrapper.setProps({ toolbar: {srcLogo: '/images/back.png', altLogo: 'Back'} });
    expect(wrapper.contains(<img src='/images/back.png' alt='Back' />)).toEqual(true);
  });

  it('should show toolbar title', () => {
    wrapper.setProps({ toolbar: {srcLogo: '/images/back.png', altLogo: 'Back', title: 'My Pokemon'} });
    const content = wrapper.find('.toolbar__title');
    expect(content.text()).toEqual('My Pokemon');
  });

  it('should render an navbar item', () => {
    wrapper.setProps({ toolbar: {srcLogo: '/images/pokemon.png', altLogo: 'Pokemon Logo'} });
    expect(wrapper.find('nav')).toHaveLength(1);
  });

  it('should show the owned total', () => {
    wrapper.setProps({ toolbar: {srcLogo: '/images/pokemon.png', altLogo: 'Pokemon Logo'}, total: 10 });
    const content = wrapper.find('.toolbar__badge');
    expect(content.text()).toEqual('10');
  });

  it('should called backHandler when click toolbar image', () => {
    const mock = jest.fn();
    wrapper.setProps({ toolbar: {srcLogo: '/images/back.png', altLogo: 'Back'}, backHandler: mock });
    wrapper.find('.logo > img').simulate('click');
    expect(mock).toHaveBeenCalled();
  });

  it('should called detailHandler when click navbar item', () => {
    const mock = jest.fn();
    wrapper.setProps({ toolbar: {srcLogo: '/images/pokemon.png', altLogo: 'Pokemon Logo'}, detailHandler: mock });
    wrapper.find('nav').simulate('click');
    expect(mock).toHaveBeenCalled();
  });
});