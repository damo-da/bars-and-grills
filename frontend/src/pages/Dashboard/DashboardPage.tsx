import React, { useState } from 'react';
import Dashboard from 'components/Dashboard/Dashboard';
import { Restaurant } from 'types/restaurant';
import api from 'utils/api';
import { ApiResponse } from 'types/api-response';

const DashboardPage = () => {
  const [restaurants, setRestaurants] = useState<Array<Restaurant>>([]);

  const getRestaurants = async () => {
    // console.log(api.defaults.headers.common.Authorization);
    const { data: apiRestaurants }: ApiResponse<Array<Restaurant>> = await api.get('/restaurants');
    setRestaurants(apiRestaurants);
  };

  React.useEffect(() => {
    getRestaurants();
  }, []);

  return <Dashboard restaurants={restaurants} />;
};

export default DashboardPage;
