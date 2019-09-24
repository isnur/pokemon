import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { App, mapStateToProps } from './App'

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import toolbarReducer from './store/reducers/toolbar';
import pokemonReducer from './store/reducers/pokemon';
import myPokemonReducer from './store/reducers/myPokemon';
import modalReducer from './store/reducers/modal';

const rootReducer = combineReducers({
  pokemon: pokemonReducer,
  myPokemon: myPokemonReducer,
  toolbar: toolbarReducer,
  modal: modalReducer
});
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(app, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should render children in my-pokemon page', async () => {
  const wrapper = await mount(<Provider store={store}>
    <MemoryRouter initialEntries={['/my-pokemon']} >
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </MemoryRouter>
  </Provider>);

  expect(wrapper.children().length).toBe(1);
  wrapper.unmount();
})

it('should render children in detail page', async () => {
  const wrapper = await mount(<Provider store={store}>
    <MemoryRouter initialEntries={['/detail/1']} >
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </MemoryRouter>
  </Provider>);

  expect(wrapper.children().length).toBe(1);
})

it('should called backHandler when click toolbar image', () => {
  const mock = jest.fn();
  const toolbar = { srcLogo: '/images/back.png', altLogo: 'Back' };
  const historyMock = { push: mock, goBack: mock };
  const wrapper = mount(<Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App
          toolbar={toolbar}
          location={{ pathname: '/detail/1' }}
          history={historyMock}
          myPokemon={[]}
          backHandler={mock} />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>);
  const back = wrapper.find('.logo > img');
  back.simulate('click');
  expect(mock).toHaveBeenCalled();
  wrapper.unmount();
});

it('should called backHandler when history length < 3', () => {
  const mock = jest.fn();
  const toolbar = { srcLogo: '/images/back.png', altLogo: 'Back' };
  const historyMock = { push: mock, goBack: mock, length: 1 };
  const wrapper = mount(<Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App
          toolbar={toolbar}
          location={{ pathname: '/detail/1' }}
          history={historyMock}
          backHandler={mock} />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>);
  const back = wrapper.find('.logo > img');
  back.simulate('click');
  expect(mock).toHaveBeenCalled();
  wrapper.unmount();
});

it('should called backHandler when history length >= 3', () => {
  const mock = jest.fn();
  const toolbar = { srcLogo: '/images/back.png', altLogo: 'Back' };
  const historyMock = { push: mock, goBack: mock, length: 3 };
  const wrapper = mount(<Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App
          toolbar={toolbar}
          location={{ pathname: '/' }}
          history={historyMock}
          backHandler={mock} />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>);
  const back = wrapper.find('.logo > img');
  back.simulate('click');
  expect(mock).toHaveBeenCalled();
  wrapper.unmount();
});

it('should called detailHandler', () => {
  const mock = jest.fn();
  const toolbar = { srcLogo: '/images/back.png', altLogo: 'Back' };
  const historyMock = { push: mock, goBack: mock };
  const wrapper = mount(<Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App
          toolbar={toolbar}
          location={{ pathname: '/' }}
          history={historyMock}
          detailHandler={mock} />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>);
  const nav = wrapper.find('nav');
  nav.simulate('click');
  expect(mock).toHaveBeenCalled();
  wrapper.unmount();
});

it('should create an props from state', () => {
  const state = {
    toolbar: { srcLogo: '/images/pokemon.png', altLogo: 'Pokemon Logo' },
    myPokemon: [{ "id": 2, "name": "ivysaur", "nickname": "Pokemon 2", "url": "https://pokeapi.co/api/v2/pokemon/2/" }],
    modal: {}
  }
  const expectedProps = {
    toolbar: state.toolbar,
    myPokemon: state.myPokemon.myPokemonList,
    modal: state.modal
  }
  expect(mapStateToProps(state)).toEqual(expectedProps)
})
