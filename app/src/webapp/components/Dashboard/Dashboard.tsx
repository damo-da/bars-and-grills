import React, { useState } from 'react';
import {
  Toolbar, AppBar, Typography, Container, makeStyles, Box, Button, Menu, MenuItem, IconButton,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import RestaurantItem from 'webapp/components/RestaurantItem/RestaurantItem';
import { Restaurant } from 'types/restaurant';
import RestaurantDetailsDialog from 'webapp/components/RestaurantDetailsDialog/RestaurantDetailsDialog';

type DashboardProps = {
  restaurants: Array<Restaurant>
  onLogout: Function,
}

const useStyles = makeStyles({
  container: {
    padding: '1em',
  },
  restaurantsContainer: {
  },
});

const DashboardComponent = ({ restaurants, onLogout }: DashboardProps) => {
  const styles = useStyles();
  const [activeRestaurant, setActiveRestaurant] = useState<Restaurant|null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const userMenuOpen = Boolean(anchorEl);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setActiveRestaurant(restaurant);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" style={{ flex: 1 }}>
            Bars & Grills
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={userMenuOpen}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => onLogout()}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={8} />
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
