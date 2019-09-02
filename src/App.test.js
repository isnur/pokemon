import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';

import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import reducer from './store/reducer';

const store = createStore(reducer);
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
