import React from 'react';

import { shallow } from 'enzyme';

import Card from './Card';

describe('<Card />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Card />);
  });

  it('should empty render', () => {
    expect(wrapper.isEmptyRender()).toEqual(true);
  });

  it('should render an `.card`', () => {
    wrapper.setProps({ name: 'nidoran-m' });
    expect(wrapper.find('.card')).toHaveLength(1);
  });

  it('should an exact formated name', () => {
    wrapper.setProps({ name: 'nidoran-m' });
    const content = wrapper.find('.card__content--description');
    expect(content.text()).toEqual('Nidoran M');
  });

  it('should render remove button', () => {
    wrapper.setProps({ name: 'nidoran-m', removed: true });
    expect(wrapper.find('.card__content--delete')).toHaveLength(1);
  });

  it('should render card content', () => {
    wrapper.setProps({ name: 'nidoran-m' });
    expect(wrapper.find('.card__content')).toHaveLength(1);
  });

  it('should render clickable card content with full width style', () => {
    wrapper.setProps({ name: 'nidoran-m', clicked: true });
    expect(wrapper.find('.card__content.card__content--link')).toHaveLength(1);
  });

  it('should render clickable card content with not full width style', () => {
    wrapper.setProps({ name: 'nidoran-m', removed: true, clicked: true });
    expect(wrapper.find('.card__content.card__content--link-remove')).toHaveLength(1);
  });
});