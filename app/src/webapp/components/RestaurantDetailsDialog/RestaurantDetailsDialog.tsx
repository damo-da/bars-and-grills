import React, { useEffect, useState } from 'react';
import {
  Dialog, useMediaQuery, useTheme, Container, AppBar,
  makeStyles, createStyles, IconButton, Typography, Toolbar,
  CardMedia, Card, CardContent,
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
import { Rating } from '@material-ui/lab';

type RestaurantDetailsDialogProps = {
  open: boolean,
  onClose: Function,
  restaurantId?: number,
};

const useStyles = makeStyles(() => createStyles({
  appBar: {
    position: 'relative',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  reviewTitle: {

  },
  card: {

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
  const userId = localStorageProvider.getUserId();
  const [restaurantDetailsState, setRestaurantDetailsState] = useState<RetaurantDetailsState>({});

  React.useEffect(() => {
    // calculate latest, highest and lowest reviews
    if (restaurant?.reviews) {
      const comparator1: Review = {
        timestamp: new Date('2001 August 24').toISOString(),
        rating: 0,
        id: 0,
        comment: '',
        user: {
          id: 0,
          username: '',
        },
      };
      const comparator2: Review = {
        timestamp: new Date('2120 August 24').toISOString(),
        rating: 6,
        id: 0,
        comment: '',
        user: {
          id: 0,
          username: '',
        },
      };

      const latestReview = R.reduce(
        R.maxBy((review:Review) => review.timestamp),
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
  }, [restaurant, userId]);

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

      // reload restaurant details and reviews
      loadRestaurant();
    } catch (e) {
      // console.error(e);

      enqueueSnackbar('Unable to review restaurant. Please try again later.');
    }
  };

  useEffect(() => {
    loadRestaurant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <Container maxWidth={false}>
        {!!restaurant && (
        <>
          <Card className={classes.card}>
            {restaurant.background_image_url && (
              <CardMedia
                component="img"
                alt="Background image"
                height="200"
                image={restaurant.background_image_url}
                title={restaurant.name}
              />
            )}
            <CardContent>
              <Typography variant="h6" color="textPrimary" component="h6">
                {restaurant.name}
              </Typography>
              <Rating
                name="avg_rating"
                size="large"
                value={restaurant.avg_rating}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2" color="textSecondary" component="p">
                {`Average rating: ${restaurant.avg_rating}`}
              </Typography>
              <Typography variant="body1" color="textPrimary" component="p">
                {!(restaurant.reviews?.length) && (
                  <span>No rating/reviews yet. Be the first one to rate/review.</span>
                )}
              </Typography>
            </CardContent>
            <CardContent>
              {restaurant.reviews && restaurant.reviews.map((review) => (
                <ReviewItemComponent
                  key={review.id}
                  review={review}
                  isHighest={restaurantDetailsState.highestReview === review}
                  isLowest={restaurantDetailsState.lowestReview === review}
                  isLatest={restaurantDetailsState.latestReview === review}
                  isCurrentUserReview={review.user.id === userId}
                />
              ))}
            </CardContent>
            <CardContent>
              <RateRestaurant
                onSubmit={handleReview}
                defaultComment={restaurantDetailsState.userReview?.comment}
                defaultRating={restaurantDetailsState.userReview?.rating}
              />
            </CardContent>
          </Card>
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
