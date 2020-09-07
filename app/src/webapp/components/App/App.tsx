import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import history from 'utils/history';

import Router from 'webapp/components/Router/Router';
import theme from 'webapp/styles/theme';

import './App.scss';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={history} />
      </ThemeProvider>
    </div>
  );
}

export default App;
