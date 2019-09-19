import * as actions from './toolbar';
import * as types from './actionTypes';

describe('toolbar actions', () => {
  it('should create an action to update a toolbar', () => {
    const toolbar = {
      srcLogo: '/images/pokemon.png',
      altLogo: 'Pokemon Logo',
      heightLogo: 42,
      title: ''
    }
    const expectedAction = {
      type: types.UPDATE_TOOLBAR,
      toolbar
    }
    expect(actions.updateToolbar(toolbar)).toEqual(expectedAction)
  })
})