import React from 'react';
import RestaurantItem from 'components/RestaurantItem/RestaurantItem';
import { Restaurant } from 'types/restaurant';

type DashboardProps = {
  restaurants: Array<Restaurant>
}
const DashboardComponent = ({ restaurants }: DashboardProps) => (
  <div>
    Restaurants
    {restaurants.map((restaurant: Restaurant) => (
      <RestaurantItem key={restaurant.id} {...restaurant} />
    ))}
  </div>
);

export default DashboardComponent;
