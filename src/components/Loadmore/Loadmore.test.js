import React from 'react';

import { shallow } from 'enzyme';

import Loadmore from './Loadmore';
import Spinner from '../Spinner/Spinner';

describe('<Loadmore />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Loadmore />);
  });

  it('should render an `.card`', () => {
    expect(wrapper.find('.card')).toHaveLength(1);
  });

  it('should disabled button when isLoading `true`', () => {
    wrapper.setProps({ isLoading: true, disabled: true });
    expect(wrapper.prop('disabled')).toEqual(true);
  });

  it('should an exact loading spinner', () => {
    wrapper.setProps({ isLoading: true });
    expect(wrapper.contains(<Spinner radius="30" width="16px" height="16px" strokeWidth="5" color="#03ac0e" />)).toEqual(true);
  });

  it('should called function when clicked', () => {
    const mock = jest.fn();
    const wrapper = shallow(
      <Loadmore
        nextUrl="https://pokeapi.co/api/v2/pokemon/?offset=25&limit=25"
        isLoading="false"
        loadmore={mock}
      />
    )
    wrapper.simulate('click');
    expect(mock).toHaveBeenCalled();
  });
});