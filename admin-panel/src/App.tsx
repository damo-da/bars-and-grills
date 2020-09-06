import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import drfProvider from 'ra-data-drf';

import Dashboard from './Dashboard';
import authProvider from './auth-provider';
import LoginComponent from "./components/Login/Login";

import {
  RestaurantIcon,
  RestaurantList,
  RestaurantEdit,
  RestaurantCreate
} from './resources/restaurant';

import './App.css';

const dataProvider1 = restProvider('http://localhost:3000');
const dataProvider = drfProvider('http://localhost:8000/api');


function App() {
  return (
    <Admin
      dataProvider={dataProvider}
      dashboard={Dashboard}
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
