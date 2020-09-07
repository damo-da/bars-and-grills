import App from 'webapp/components/App/App';

import { initAuthModule, redirectIfNotLoggedIn } from 'webapp/utils/auth';

initAuthModule();
redirectIfNotLoggedIn();

export default App;
