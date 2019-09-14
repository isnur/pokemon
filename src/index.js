import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


import './index.css';
import App from './App';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import * as serviceWorker from './serviceWorker';
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

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
