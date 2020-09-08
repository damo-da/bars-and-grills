import React, { useEffect, useState } from 'react';
import {
  Dialog, useMediaQuery, useTheme, DialogTitle, Container, AppBar,
  makeStyles, Theme, createStyles, IconButton, Typography, Toolbar,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import { Restaurant } from 'types/restaurant';
import { ApiResponse } from 'types/api-response';

import api from 'webapp/utils/api';

type RestaurantDetailsDialogProps = {
  open: boolean,
  onClose: Function,
  restaurantId?: number,
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const RestaurantDetailsDialog = ({ open, onClose, restaurantId }: RestaurantDetailsDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [restaurant, setRestaurant] = useState<Restaurant|undefined>(undefined);
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const loadRestaurant = async () => {
    if (!restaurantId) return;

    const { data: apiRestaurant } : ApiResponse<Restaurant> = await api.get(`/restaurants/${restaurantId}`);
    setRestaurant(apiRestaurant);
  };

  useEffect(() => {
    loadRestaurant();
  }, [restaurantId]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
    >

      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {restaurant?.name ?? '...'}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogTitle>Restaurant Info</DialogTitle>
      <Container>
        <div>Restaurant info goes here.</div>
        {!!restaurant && (
        <>
          <div>{restaurant.name}</div>
        </>
        )}
      </Container>
    </Dialog>
  );
};

RestaurantDetailsDialog.defaultProps = {
  restaurantId: null,
};

export default RestaurantDetailsDialog;
