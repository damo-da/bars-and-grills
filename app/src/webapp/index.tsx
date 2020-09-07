import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from 'utils/serviceWorker';

import { initAuthModule, redirectIfNotLoggedIn } from 'webapp/utils/auth';
import App from 'webapp/components/App/App';

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
