import React from 'react';
import { Admin, Resource } from 'react-admin';
import drfProvider from 'ra-data-drf';

import Dashboard from './Dashboard';
import authProvider from './common/utils/auth-provider';

import {
  RestaurantIcon,
  RestaurantList,
  RestaurantEdit,
  RestaurantCreate
} from './resources/restaurant';

import './App.css';
import restProvider from './common/utils/rest-provider';

function App() {
  return (
    <Admin
      dataProvider={restProvider}
      dashboard={Dashboard}
      authProvider={authProvider}
    >
      <Resource
        name="restaurants"
        list={RestaurantList}
        edit={RestaurantEdit}
        create={RestaurantCreate}
        icon={RestaurantIcon}
      />
    </Admin>
  );
}

export default App;
