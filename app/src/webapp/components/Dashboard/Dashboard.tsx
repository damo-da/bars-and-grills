import React, { useState } from 'react';
import {
  Toolbar, AppBar, Typography, Container, makeStyles, Box,
} from '@material-ui/core';
import RestaurantItem from 'webapp/components/RestaurantItem/RestaurantItem';
import { Restaurant } from 'types/restaurant';
import RestaurantDetailsDialog from 'webapp/components/RestaurantDetailsDialog/RestaurantDetailsDialog';

type DashboardProps = {
  restaurants: Array<Restaurant>
}

const useStyles = makeStyles({
  container: {
    padding: '1em',
  },
  restaurantsContainer: {
  },
});

const DashboardComponent = ({ restaurants }: DashboardProps) => {
  const styles = useStyles();
  const [activeRestaurant, setActiveRestaurant] = useState<Restaurant|null>(null);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setActiveRestaurant(restaurant);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Bars & Grills
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={1} />
        <Box className={styles.restaurantsContainer}>
          {restaurants.map((restaurant: Restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              onClick={handleRestaurantClick}
            />
          ))}
        </Box>
        <RestaurantDetailsDialog
          open={!!activeRestaurant}
          onClose={() => setActiveRestaurant(null)}
          restaurantId={activeRestaurant?.id}
        />
      </Container>
    </>
  );
};

export default DashboardComponent;
