import { Restaurant } from 'types/restaurant';
import React from 'react';

const RestaurantItemComponent = ({ name }: Restaurant) => (
  <div>{name}</div>
);

export default RestaurantItemComponent;
