import React, { useEffect, useState } from 'react';
import {
  Dialog, useMediaQuery, useTheme, DialogTitle, Container, AppBar,
  makeStyles, Theme, createStyles, IconButton, Typography, Toolbar,
  List, ListItem,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import * as R from 'ramda';
import { useSnackbar } from 'notistack';

import type { Restaurant } from 'types/restaurant';
import type { ApiResponse } from 'types/api-response';
import type { Review } from 'types/review';

import api from 'webapp/utils/api';
import localStorageProvider from 'utils/localstorage-provider';
import ReviewItemComponent from 'webapp/components/ReviewItem/ReviewItem';
import RateRestaurant from 'webapp/components/RateRestaurant/RateRestaurant';

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
  reviewTitle: {

  },
}));

type ReviewInput = {
  comment: string,
  rating: number,
}

type RetaurantDetailsState = {
  latestReview?: Review,
  highestReview?: Review,
  lowestReview?: Review,
  userReview?: Review,
}

const RestaurantDetailsDialog = ({ open, onClose, restaurantId }: RestaurantDetailsDialogProps) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [restaurant, setRestaurant] = useState<Restaurant|undefined>(undefined);
  const classes = useStyles();

  const [restaurantDetailsState, setRestaurantDetailsState] = useState<RetaurantDetailsState>({});

  React.useEffect(() => {
    // calculate latest, highest and lowest reviews
    if (restaurant?.reviews) {
      const comparator1: Review = {
        timestamp: new Date('2120 August 24'),
        rating: 0,
        id: 0,
        comment: '',
        user: {
          id: 0,
          username: '',
        },
      };
      const comparator2: Review = {
        timestamp: new Date('2120 August 24'),
        rating: 6,
        id: 0,
        comment: '',
        user: {
          id: 0,
          username: '',
        },
      };

      const latestReview = R.reduce(
        R.minBy((review:Review) => review.timestamp),
        comparator1,
        restaurant.reviews,
      );

      const highestReview = R.reduce(
        R.maxBy((review:Review) => review.rating),
        comparator1,
        restaurant.reviews,
      );

      const lowestReview = R.reduce(
        R.minBy((review:Review) => review.rating),
        comparator2,
        restaurant.reviews,
      );

      const userId = localStorageProvider.getUserId();
      const userReview = userId ? restaurant.reviews.find((r) => r.user.id === userId) : undefined;

      setRestaurantDetailsState({
        latestReview,
        highestReview,
        lowestReview,
        userReview,
      });
    } else {
      setRestaurantDetailsState({});
    }
  }, [restaurant]);

  const handleClose = () => {
    setRestaurant(undefined);
    onClose();
  };

  const loadRestaurant = async () => {
    if (!restaurantId) return;

    const { data: apiRestaurant } : ApiResponse<Restaurant> = await api.get(`/restaurants/${restaurantId}`);
    setRestaurant(apiRestaurant);
  };

  const handleReview = async ({ comment, rating }: ReviewInput) => {
    if (!restaurant) return;

    const userId = localStorageProvider.getUserId();

    const apiData: any = {
      comment,
      rating,
      restaurant_id: restaurant.id,
    };

    const existingReview = restaurantDetailsState.userReview;

    try {
      if (existingReview) {
        await api.put(`/reviews/${existingReview.id}/`, apiData);

        enqueueSnackbar('Existing review updated.');
      } else {
        await api.post('/reviews/', apiData);

        enqueueSnackbar('Review added.');
      }
    } catch (e) {
      console.error(e);

      enqueueSnackbar('Unable to review restaurant. Please try again later.');
    }
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
            {restaurant?.name || '...'}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container>
        {!!restaurant && (
        <>
          <DialogTitle>{restaurant.name}</DialogTitle>
          {!(restaurant.reviews?.length) && (
          <div>No rating/reviews yet. Be the first one to rate/review.</div>
          )}
          {restaurant.reviews && restaurant.reviews.map((review) => (
            <ReviewItemComponent
              key={review.id}
              review={review}
              isHighest={restaurantDetailsState.highestReview === review}
              isLowest={restaurantDetailsState.lowestReview === review}
              isLatest={restaurantDetailsState.latestReview === review}
            />
          ))}
          <RateRestaurant
            onSubmit={handleReview}
            defaultComment={restaurantDetailsState.userReview?.comment}
            defaultRating={restaurantDetailsState.userReview?.rating}
          />
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
