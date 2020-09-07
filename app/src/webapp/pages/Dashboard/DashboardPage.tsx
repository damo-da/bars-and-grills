import React, { useState } from 'react';
import type { Paginated } from 'types/paginated';

import Dashboard from 'webapp/components/Dashboard/Dashboard';
import { Restaurant } from 'types/restaurant';
import api from 'webapp/utils/api';
import { ApiResponse } from 'types/api-response';

const DashboardPage = () => {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);

  const getRestaurants = async () => {
    const { data: { results: apiRestaurants } }: ApiResponse<Paginated<Restaurant>> = await api.get('/restaurants');
    setRestaurants(apiRestaurants);
  };

  React.useEffect(() => {
    getRestaurants();
  }, []);

  return <Dashboard restaurants={restaurants} />;
};

export default DashboardPage;
