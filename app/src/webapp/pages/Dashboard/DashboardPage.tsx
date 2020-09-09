import React, { useState } from 'react';
import type { Paginated } from 'types/paginated';
import { useLocation, useHistory } from 'react-router-dom';

import Dashboard from 'webapp/components/Dashboard/Dashboard';
import { Restaurant } from 'types/restaurant';
import api from 'webapp/utils/api';
import { ApiResponse } from 'types/api-response';
import localStorageProvider from 'utils/localstorage-provider';

const DashboardPage = () => {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
  const location = useLocation();
  const history = useHistory();

  const getRestaurants = async () => {
    const { data: { results: apiRestaurants } }: ApiResponse<Paginated<Restaurant>> = await api.get('/restaurants');
    setRestaurants(apiRestaurants);
  };

  React.useEffect(() => {
    getRestaurants();
  }, [location]);

  const handleLogout = () => {
    localStorageProvider.clear();
    history.replace('/login');
  };

  return <Dashboard restaurants={restaurants} onLogout={handleLogout} />;
};

export default DashboardPage;
