import React from 'react';
import { Admin, Resource } from 'react-admin';
import api from 'admin-panel/utils/api';

import Dashboard from 'admin-panel/components/Dashboard/Dashboard';
import authProvider from 'admin-panel/utils/auth-provider';
import drfProvider from 'admin-panel/utils/data-provider';

import {
  RestaurantIcon,
  RestaurantList,
  RestaurantEdit,
  RestaurantCreate,
} from 'admin-panel/resources/restaurant';
import {
  ReviewIcon,
  ReviewList,
  ReviewEdit,
  ReviewCreate,
} from 'admin-panel/resources/review';
import {
  UserIcon,
  UserList,
  UserEdit,
  UserCreate,
} from 'admin-panel/resources/user';

import './App.css';

function App() {
  return (
    <Admin
      dataProvider={drfProvider('', api)}
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
      <Resource
        name="reviews"
        list={ReviewList}
        edit={ReviewEdit}
        create={ReviewCreate}
        icon={ReviewIcon}
      />
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        create={UserCreate}
        icon={UserIcon}
      />
    </Admin>
  );
}

export default App;
