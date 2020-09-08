import React, { useState } from 'react';
import type { Paginated } from 'types/paginated';
import { useLocation } from 'react-router-dom';

import Dashboard from 'webapp/components/Dashboard/Dashboard';
import { Restaurant } from 'types/restaurant';
import api from 'webapp/utils/api';
import { ApiResponse } from 'types/api-response';

const DashboardPage = () => {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);
  const location = useLocation();

  const getRestaurants = async () => {
    const { data: { results: apiRestaurants } }: ApiResponse<Paginated<Restaurant>> = await api.get('/restaurants');
    setRestaurants(apiRestaurants);
  };

  React.useEffect(() => {
    getRestaurants();
  }, [location]);

  return <Dashboard restaurants={restaurants} />;
};

export default DashboardPage;
