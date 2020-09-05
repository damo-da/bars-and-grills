import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import Router from 'components/Router/Router';
import theme from 'styles/theme';
import history from 'utils/history';

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
