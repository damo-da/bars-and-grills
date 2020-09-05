import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import LoginPage from 'pages/Login';
import DashboardPage from 'pages/Dashboard';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/dash">
        <DashboardPage />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
