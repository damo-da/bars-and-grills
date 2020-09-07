import React from 'react';
import {
  Router as ReactRouter,
  Switch,
  Route,
} from 'react-router-dom';
import * as H from 'history';

import LoginPage from 'webapp/pages/Login/LoginPage';
import DashboardPage from 'webapp/pages/Dashboard/DashboardPage';

type RouterProps = {
  history: H.History
}
const Router = ({ history }: RouterProps) => (
  <ReactRouter history={history}>
    <Switch>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/">
        <DashboardPage />
      </Route>
    </Switch>
  </ReactRouter>
);

export default Router;
