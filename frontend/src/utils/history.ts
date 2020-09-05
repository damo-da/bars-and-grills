import * as H from 'history';
import { createBrowserHistory } from 'history';
import { isUserLoggedIn } from './auth';

const history: H.History = createBrowserHistory();

export const redirectIfNotLoggedIn = () => {
  if (!isUserLoggedIn()) {
    history.replace('/login');
  }
};

export default history;
