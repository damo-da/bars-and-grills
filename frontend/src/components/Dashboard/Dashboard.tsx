import React from 'react';
import {
  Toolbar, AppBar, Typography, Container,
} from '@material-ui/core';
import RestaurantItem from 'components/RestaurantItem/RestaurantItem';
import { Restaurant } from 'types/restaurant';

type DashboardProps = {
  restaurants: Array<Restaurant>
}
const DashboardComponent = ({ restaurants }: DashboardProps) => (
  <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          Bars & Grills
        </Typography>
      </Toolbar>
    </AppBar>

    <Container maxWidth="sm">
      {restaurants.map((restaurant: Restaurant) => (
        <RestaurantItem key={restaurant.id} {...restaurant} />
      ))}
    </Container>
  </>
);

export default DashboardComponent;
