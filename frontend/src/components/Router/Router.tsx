import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from 'pages/Login';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
