import React from 'react';
import { Admin, Resource } from 'react-admin';
import drfProvider from 'ra-data-drf';

import Dashboard from '../../components/Dashboard/Dashboard';
import authProvider from '../../common/utils/auth-provider';
import restProvider from '../../common/utils/rest-provider';

import {
  RestaurantIcon,
  RestaurantList,
  RestaurantEdit,
  RestaurantCreate,
} from '../../resources/restaurant';
import {
  ReviewIcon,
  ReviewList,
  ReviewEdit,
  ReviewCreate,
} from '../../resources/review';
import {
  UserIcon,
  UserList,
  UserEdit,
  UserCreate,
} from "../../resources/user";

import './App.css';

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
