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
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RestaurantItemComponent;
