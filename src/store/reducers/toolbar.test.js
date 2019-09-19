import reducer from './toolbar';
import * as types from '../actions/actionTypes';

describe('toolbar reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      srcLogo: '/images/pokemon.png',
      altLogo: 'Pokemon Logo',
      heightLogo: 42,
      title: ''
    })
  })

  it('should handle UPDATE_TOOLBAR', () => {
    expect(
      reducer({}, {
        type: types.UPDATE_TOOLBAR,
        toolbar: {
          srcLogo: '/images/back.png',
          altLogo: 'Back',
          heightLogo: 42,
          title: 'My Pokemon'
        }
      })
    ).toEqual({
      srcLogo: '/images/back.png',
      altLogo: 'Back',
      heightLogo: 42,
      title: 'My Pokemon'
    })
  })
})