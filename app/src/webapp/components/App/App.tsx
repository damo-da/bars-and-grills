import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';

import history from 'utils/history';

import Router from 'webapp/components/Router/Router';
import theme from 'webapp/styles/theme';

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={2}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router history={history} />
        </ThemeProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
