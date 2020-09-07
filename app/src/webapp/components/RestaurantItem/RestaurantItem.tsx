import React from 'react';
import {
  Card, CardContent, Typography, makeStyles,
} from '@material-ui/core';

import { Restaurant } from 'types/restaurant';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const RestaurantItemComponent = ({ name }: Restaurant) => {
  const classes = useStyles();
  const cardClicked = (e: React.MouseEvent) => {
    e.preventDefault();

    // eslint-disable-next-line no-console
    console.log('card clicked');
  };

  return (
    <Card className={classes.root} variant="outlined" onClick={cardClicked}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RestaurantItemComponent;
