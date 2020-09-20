import React, { useState } from 'react';
import type { Paginated } from 'types/paginated';
import { useLocation, useHistory } from 'react-router-dom';

import type { Restaurant } from 'types/restaurant';
import type { ApiResponse } from 'types/api';

import Dashboard from 'webapp/components/Dashboard/Dashboard';
import api from 'webapp/utils/api';
import localStorageProvider from 'utils/localstorage-provider';

const DashboardPage = () => {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
  const location = useLocation();
  const history = useHistory();

  const getRestaurants = async () => {
    const { data: { results: apiRestaurants } }: ApiResponse<Paginated<Restaurant>> = await api.get('/restaurants');
    setRestaurants(apiRestaurants.sort((a, b) => {
      if (a.avg_rating === b.avg_rating) return 0;
      if (a.avg_rating > b.avg_rating) return -1;
      return +1;
    }));
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
