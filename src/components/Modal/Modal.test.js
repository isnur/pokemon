import React from 'react';

import { shallow, mount } from 'enzyme';

import Modal from './Modal';

describe('<Modal />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Modal />);
  });

  it('should empty render', () => {
    wrapper.setProps({ modal: { status: false } });
    expect(wrapper.isEmptyRender()).toEqual(true);
  });

  it('should open the modal', () => {
    wrapper.setProps({ modal: { status: true } });
    expect(wrapper.find('.modal__container')).toHaveLength(1);
  });

  it('should show success title', () => {
    wrapper.setProps({ modal: { status: true, content: true } });
    const content = wrapper.find('h2');
    expect(content.text()).toEqual('Successfully caught the Pokemon');
  });

  it('should show failed title', () => {
    wrapper.setProps({ modal: { status: true, content: false } });
    const content = wrapper.find('h2');
    expect(content.text()).toEqual('Failed to catch the Pokemon');
  });

  it('should show error message when nickname is empty', () => {
    const wrapper = mount(<Modal />);
    const mock = jest.fn();
    let errorMsg = '';
    
    wrapper.setProps({ modal: { status: true, content: true, action: { submit: mock } } });
    const input = wrapper.find('.modal__input');
    const submit = wrapper.find('.toggle__button--submit');
    submit.simulate('click');
    expect(mock).toHaveBeenCalled();

    if (input.getDOMNode().value === '') {
      errorMsg = 'Nickname is required'
    }
    wrapper.setProps({ modal: { status: true, content: true, errorMsg: errorMsg, action: { submit: mock } } });
    const error = wrapper.find('.modal__error');
    if (errorMsg) {
      expect(error.text()).toEqual('Nickname is required');
    } else {
      expect(error.exists()).toEqual(false);
    }
  });

  it('should be able to submit the modal', () => {
    const newValue = 'nickname';
    const wrapper = mount(<Modal />);
    const mock = jest.fn();
    wrapper.setProps({ modal: { status: true, content: true, action: { submit: mock } } });
    const input = wrapper.find('.modal__input');
    const submit = wrapper.find('.toggle__button--submit');
    input.simulate('change', { target: { value: newValue } });
    submit.simulate('click');
    expect(mock).toHaveBeenCalled();
  });

  it('should render an `.modal__outside`', () => {
    const mock = jest.fn();
    wrapper.setProps({ modal: { status: true, clickToClose: true, action: { cancel: mock } } });
    const content = wrapper.find('.modal__outside');
    expect(content).toHaveLength(1);
  });

  it('should close the modal when click outside', () => {
    const mock = jest.fn();
    wrapper.setProps({ modal: { status: true, clickToClose: true, action: { cancel: mock } } });
    const close = wrapper.find('.modal__outside');
    close.simulate('click');
    expect(mock).toHaveBeenCalled();
  });

  it('should close the modal when click close button', () => {
    const mock = jest.fn();
    wrapper.setProps({ modal: { status: true, action: { cancel: mock } } });
    const close = wrapper.find('.toggle__button--cancel');
    close.simulate('click');
    expect(mock).toHaveBeenCalled();
  });
});