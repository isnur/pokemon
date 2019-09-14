import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';

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
