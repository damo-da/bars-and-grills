import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from 'utils/serviceWorker';

import './index.scss';

const BUILD_TARGETS = [
  {
    name: 'webapp',
    path: './webapp/index',
  },
  {
    name: 'admin-panel',
    path: './admin-panel/index',
  },
];

// eslint-disable-next-line no-console
console.log(process.env);

// Determine which entry point to import
const { path } = BUILD_TARGETS.find(
  ({ name }) => process.env.REACT_APP_PROJECT === name,
) || BUILD_TARGETS[0];

// Import the entry point and render it's default export
import(`${path}`).then(({ default: BuildTarget }) => {
  ReactDOM.render(
    <BuildTarget />,
    document.getElementById('root'),
  );

  serviceWorker.unregister();
  return null;
});

serviceWorker.unregister();
