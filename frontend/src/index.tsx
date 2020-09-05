import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App/App';
import * as serviceWorker from 'utils/serviceWorker';

import { initAuthModule } from './utils/auth';
import { redirectIfNotLoggedIn } from './utils/history';

import './index.scss';

initAuthModule();
redirectIfNotLoggedIn();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
