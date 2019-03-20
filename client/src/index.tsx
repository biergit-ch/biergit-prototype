import './index.css';

import 'typeface-roboto';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';
import * as dotenv from 'dotenv';
import App from './containers/App/App';
import { configureStore } from './store';
import { WebAuthentication } from './auth';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import customHistory from './utils/History';

dotenv.config();

const store = configureStore();
const auth = new WebAuthentication();
ReactDOM.render(
  <Provider store={store}>
    <Router history={customHistory}>
      <App store={store} auth={auth} />,
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
