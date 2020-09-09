import React from 'react';
import {
  Typography, makeStyles, ButtonBase, Paper, Box, Grid,
} from '@material-ui/core';
import { Star } from '@material-ui/icons';

import { Restaurant } from 'types/restaurant';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    width: '100%',
    padding: theme.spacing(4),
    margin: theme.spacing(2),
  },
  container: {
    display: 'inline-block',
  },
  title: {
    fontSize: 14,
  },
  avgRating: {
    fontSize: 14,
    marginRight: theme.spacing(0.5),
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 14,
  },
  box: {
    padding: theme.spacing(2),
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: theme.palette.grey.A700,
    background: '#ccca',
    display: 'grid',
    gridTemplateColumns: 'minmax(200px, 25%) 1fr',
  },
}));

type RestaurantItemProps = {
  restaurant: Restaurant,
  onClick: Function,
};

const RestaurantItemComponent = ({ restaurant, onClick }: RestaurantItemProps) => {
  const { name, background_image_url, avg_rating }: Restaurant = restaurant;
  const classes = useStyles();
  const cardClicked = (e: React.MouseEvent) => {
    e.preventDefault();

    onClick(restaurant);
  };

  return (
    <Grid xs={12} sm={6} md={4} lg={4} item className={classes.container}>
      <ButtonBase onClick={cardClicked}>
        <Paper
          className={classes.root}
          elevation={3}
          style={{
            background: background_image_url ? `url(${background_image_url})` : undefined,
          }}
        >
          <Box className={classes.box}>
            <Typography
              className={classes.title}
              color="textPrimary"
            >
              {name}
            </Typography>
            <span className={classes.ratingContainer}>
              <Typography
                className={classes.avgRating}
                color="textPrimary"
              >
                {avg_rating ?? '-'}
              </Typography>
              <Star className={classes.star} />
            </span>
          </Box>
        </Paper>
      </ButtonBase>
    </Grid>
  );
};

export default RestaurantItemComponent;
