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
    display: 'inline-flex',
  },
}));

const RestaurantItemComponent = ({ name, background_image_url, avg_rating }: Restaurant) => {
  const classes = useStyles();
  const cardClicked = (e: React.MouseEvent) => {
    e.preventDefault();

    // eslint-disable-next-line no-console
    console.log('card clicked');
  };

  return (
    <Grid xs={11} sm={5} md={4} lg={3} className={classes.container}>
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
            <Star className={classes.star} />
            <Typography
              className={classes.avgRating}
              color="textPrimary"
            >
              {avg_rating ?? '-'}
            </Typography>
          </Box>
        </Paper>
      </ButtonBase>
    </Grid>
  );
};

export default RestaurantItemComponent;
